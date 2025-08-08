/**
 * 数据库连接配置文件
 * 用于建立与MySQL数据库的连接
 * 作者: [你的名字]
 * 创建时间: [创建时间]
 */

// 引入MySQL模块
var mysql = require('mysql');

// 引入主应用文件（如果需要的话）
const app = require("./app");

/**
 * 创建数据库连接配置
 * 配置MySQL数据库的连接参数
 */
var db = mysql.createConnection({
    host: 'localhost',        // 数据库主机地址
    user: 'root',            // 数据库用户名
    password: '',      // 数据库密码
    database: 'nodejsProject', // 数据库名称
})

// 建立数据库连接
db.connect();

// 导出数据库连接对象，供其他模块使用
module.exports = db;