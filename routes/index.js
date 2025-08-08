var express = require('express');
var router = express.Router();
var db = require('../sql.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 登录逻辑 */
router.post('/main', function(req, res, next) {
  const { username, password } = req.body;

  // 简单校验
  if (!username || !password) {
    return res.send('用户名和密码不能为空');
  }

  // 查询数据库
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(sql, [username, password], function(err, data) {
    if (err) {
      console.error('数据库查询出错:', err);
      return res.status(500).send('服务器错误');
    }

    if (data.length > 0) {
      // 登录成功
      res.render('main');
    } else {
      // 登录失败
      res.send('用户名或密码错误');
    }
  });
});

module.exports = router;
