var express = require('express');
var router = express.Router();
var db = require('../sql.js');
router.post('/', function(req, res) {
    const id = req.body.id;

    // 执行删除操作
    db.query('DELETE FROM banner_images WHERE id = ?', [id], function(err, result) {
        if (err) {
            console.error('删除出错:', err);
            return res.json({
                success: false,
                message: '数据库删除失败'
            });
        }

        if (result.affectedRows > 0) {
            // 删除成功
            res.json({
                success: true,
                message: '删除成功'
            });
        } else {
            // 没有找到要删除的记录
            res.json({
                success: false,
                message: '未找到要删除的记录'
            });
        }
    });
});


module.exports = router;