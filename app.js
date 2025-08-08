// 引入创建 HTTP 错误对象的模块，用于处理 404、500 等错误
var createError = require('http-errors');

// 引入 Express 框架
var express = require('express');

// Node.js 内置的路径模块，用于处理文件路径
var path = require('path');

// 解析 Cookie 的中间件
var cookieParser = require('cookie-parser');

// 请求日志中间件，开发时用来记录请求信息
var logger = require('morgan');


// 路由模块（可以拆分多个路由文件）
var indexRouter = require('./routes/index');
var  left = require('./routes/left');
var  right = require('./routes/right');
var  bannerList = require('./routes/bannerList');
var  addBanner = require('./routes/addBanner');
var  like = require('./routes/like');
var  del = require('./routes/del');
var  update = require('./routes/update');

// 创建一个 Express 应用实例
var app = express();


// === 设置视图引擎 ===
// 设置视图文件所在目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 EJS
app.set('view engine', 'ejs');


// === 注册中间件 ===

// 记录请求日志（格式为 dev）
app.use(logger('dev'));

// 解析 JSON 格式的请求体
app.use(express.json());

// 解析 URL 编码的请求体（表单提交）
app.use(express.urlencoded({extended: false}));

// 解析 Cookie
app.use(cookieParser());

// 托管静态文件，比如 CSS、图片、JS 等
app.use(express.static(path.join(__dirname, 'public')));


// === 注册路由 ===

// 当访问 /admin 路径时，使用 indexRouter 处理
app.use('/admin', indexRouter);
//左侧
app.use('/left', left);
// 右侧
app.use('/right', right);
app.use('/bannerList', bannerList);
app.use('/addBanner', addBanner);
app.use('/like', like);
app.use('/del', del);
app.use('/update', update);

// === 捕获 404 错误，并转发给错误处理器 ===
app.use(function (req, res, next) {
    next(createError(404));
});


// === 错误处理器 ===
app.use(function (err, req, res, next) {
    // 设置本地变量，开发环境下显示详细错误信息
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // 设置响应状态码，并渲染错误页面
    res.status(err.status || 500);
    res.render('error');
});


// 导出 app 模块（供 bin/www 调用）
module.exports = app;
