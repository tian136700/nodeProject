var express = require('express');
var router = express.Router();

var db = require('../sql.js');
var pagerUtils = require('../utils/pager.js');

router.get('/', function (req, res, next) {
    var search = req.query.search;
    // 获取查询参数
    var page = parseInt(req.query.page) || 1;           // 当前页码
    var pageSize = parseInt(req.query.pageSize) || 10;   // 每页显示条数

    // 计算偏移量
    var offset = (page - 1) * pageSize;

    // 查询总记录数
    var countSql = 'SELECT COUNT(*) as total FROM banner_images WHERE image_name LIKE ?';

    db.query(countSql, ['%' + search + '%'], function (err, countResult) {
        if (err) {
            console.error('查询总数出错:', err);
            return res.status(500).send('数据库查询错误');
        }

        var totalCount = countResult[0].total;

        // 计算分页信息
        var pager = {
            currentPage: page,                    // 当前页码
            pageSize: pageSize,                   // 每页显示条数
            totalCount: totalCount,               // 总记录数
            totalPages: Math.ceil(totalCount / pageSize), // 总页数
            startIndex: offset + 1,               // 当前页起始索引
            endIndex: Math.min(offset + pageSize, totalCount) // 当前页结束索引
        };

        // 查询当前页数据
        // var dataSql = 'SELECT * FROM banner_images ORDER BY id DESC LIMIT ? OFFSET ?';
        var dataSql = 'SELECT * FROM banner_images WHERE image_name LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?';


        db.query(dataSql, ['%' + search + '%', pageSize, offset], function (err, results) {
            if (err) {
                console.error('查询数据出错:', err);
                return res.status(500).send('数据库查询错误');
            }

            // 生成分页按钮数组
            pager.pages = pagerUtils.generatePageNumbers(pager.currentPage, pager.totalPages);

            res.render('bannerList', {
                bannerList: results,
                pager: pager
            });
        });
    });
});
// });

module.exports = router;