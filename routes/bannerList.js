var express = require('express');
var router = express.Router();
var db = require('../sql.js');
var pagerUtils = require('../utils/pager.js');

/**
 * Banner列表页面路由
 * 支持基本分页功能
 */
router.get('/', function (req, res, next) {
    // 获取查询参数
    var page = parseInt(req.query.page) || 1;           // 当前页码
    var pageSize = parseInt(req.query.pageSize) || 10;   // 每页显示条数
    
    // 计算偏移量
    var offset = (page - 1) * pageSize;
    
    // 查询总记录数
    var countSql = 'SELECT COUNT(*) as total FROM banner_images';
    
    db.query(countSql, function (err, countResult) {
        if (err) {
            console.error('查询总数出错:', err);
            return res.status(500).send('数据库查询错误');
        }
        
        var totalCount = countResult[0].total;
        
        // 使用通用分页函数创建分页对象
        var pager = pagerUtils.createPager(page, pageSize, totalCount);
        
        // 查询当前页数据
        var dataSql = 'SELECT * FROM banner_images ORDER BY id DESC LIMIT ? OFFSET ?';
        
        db.query(dataSql, [pageSize, offset], function (err, results) {
            if (err) {
                console.error('查询数据出错:', err);
                return res.status(500).send('数据库查询错误');
            }
            
            res.render('bannerList', {
                bannerList: results,
                pager: pager
            });
        });
    });
});



module.exports = router;