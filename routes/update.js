var express = require('express');
var router = express.Router();
var db = require('../sql.js');
var multiparty = require('multiparty'); // 传图片的包
var pagerUtils = require('../utils/pager.js');


router.post('/', function(req, res, next) {
    var form = new multiparty.Form();
    form.uploadDir = './public/upload';

    form.parse(req, function (err, fields, files) {
        var  upid = fields.id[0]

        console.log(upid);

        var imgName = fields.imageName[0];
        // 图片路径
        var pic = files.imageFile[0].path;
        //
        db.query('UPDATE banner_images SET image_name = ?, image_url = ? WHERE id = ?',
            [imgName, pic, upid], function (err, results) {
                if (err) {
                    console.error('插入数据出错:', err);
                    return res.status(500).send('数据库插入失败');
                } else {
                    // 查询所有数据并计算分页信息
                    db.query('select count(*) as total from banner_images', function (err, countResult) {
                        if (err) {
                            console.error('查询总数出错:', err);
                            return res.status(500).send('数据库查询失败');
                        }

                        var totalCount = countResult[0].total;

                        // 使用通用分页函数创建分页对象（显示第一页）
                        var pager = pagerUtils.createPager(1, 10, totalCount);

                        // 查询第一页数据
                        db.query('select * from banner_images order by id desc limit 10', function (err, results) {
                            if (err) {
                                console.error('查询数据出错:', err);
                                return res.status(500).send('数据库查询失败');
                            } else {
                                res.render('bannerList', {
                                    bannerList: results,
                                    pager: pager
                                });
                            }
                        });
                    });
                }
            });
    });
});

module.exports = router;