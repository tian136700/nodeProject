# 小鹿后台管理系统

## 项目简介
这是一个基于 Node.js + Express + MySQL 的后台管理系统，主要用于管理 banner 图片等内容。

## 技术栈
- **后端**: Node.js + Express
- **数据库**: MySQL
- **模板引擎**: EJS
- **前端**: HTML + CSS + JavaScript

## 项目结构
```
nodeProject/
├── app.js                 # 应用入口文件
├── routes/               # 路由文件
│   ├── index.js         # 登录相关路由
│   ├── bannerList.js    # Banner列表路由
│   ├── addBanner.js     # 添加Banner路由
│   ├── update.js        # 更新Banner路由
│   ├── del.js           # 删除Banner路由
│   ├── left.js          # 左侧导航路由
│   └── right.js         # 右侧内容路由
├── views/               # 视图模板
│   ├── index.ejs        # 登录页面
│   ├── main.ejs         # 主框架页面
│   ├── bannerList.ejs   # Banner列表页面
│   ├── left.ejs         # 左侧导航
│   └── right.ejs        # 右侧内容
├── public/              # 静态资源
│   ├── stylesheets/     # CSS样式文件
│   ├── images/          # 图片资源
│   └── upload/          # 上传文件目录
├── utils/               # 工具类
│   └── pager.js         # 分页工具
└── sql.js               # 数据库连接配置
```

## 安装和运行

### 1. 安装依赖
```bash
npm install
```

### 2. 配置数据库
修改 `sql.js` 文件中的数据库连接信息：
```javascript
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
});
```

### 3. 创建数据库表
```sql
-- 用户表
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Banner图片表
CREATE TABLE banner_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_name VARCHAR(100) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. 启动应用
```bash
npm start
```

访问 `http://localhost:3001/admin` 进入登录页面。

## 功能特性

### 1. 用户认证
- 用户登录功能
- 后台管理界面

### 2. Banner管理
- Banner图片列表展示
- 添加新的Banner图片
- 编辑现有Banner信息
- 删除Banner图片
- 分页显示

### 3. 界面特性
- 响应式设计
- 现代化UI界面
- 动画效果
- 文件上传预览

## ⚠️ 安全提醒

### 当前密码存储方式
目前系统使用**明文存储密码**，存在严重的安全风险：

```javascript
// 当前不安全的做法
const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
db.query(sql, [username, password], ...);
```

### 建议的安全改进方案

#### 1. 使用 bcrypt 加密（推荐）
```bash
npm install bcrypt
```

```javascript
const bcrypt = require('bcrypt');

// 加密密码
const hashedPassword = await bcrypt.hash(password, 10);

// 验证密码
const isMatch = await bcrypt.compare(password, hashedPassword);
```

#### 2. 使用 MD5 + Salt（简单方案）
```javascript
const crypto = require('crypto');

// 生成盐值
const salt = crypto.randomBytes(16).toString('hex');

// 加密密码
const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
```

#### 3. 其他安全建议
- 使用 HTTPS
- 实现登录失败次数限制
- 添加验证码机制
- 实现会话管理
- 使用环境变量存储敏感信息

### 数据库安全
- 定期备份数据库
- 使用强密码
- 限制数据库访问权限
- 定期更新数据库版本

## 开发建议

### 代码优化
1. **提取公共逻辑**: 将重复的数据库操作提取到服务类中
2. **错误处理**: 统一错误处理机制
3. **日志记录**: 添加操作日志
4. **参数验证**: 加强输入参数验证

### 性能优化
1. **数据库索引**: 为常用查询字段添加索引
2. **图片压缩**: 上传图片时进行压缩
3. **缓存机制**: 添加Redis缓存
4. **分页优化**: 大数据量时的分页优化

## 部署说明

### 生产环境配置
1. 修改数据库连接为生产环境配置
2. 设置环境变量
3. 配置反向代理（Nginx）
4. 启用HTTPS
5. 设置日志轮转

### PM2 部署
```bash
npm install -g pm2
pm2 start app.js --name "xiaolu-admin"
pm2 save
pm2 startup
```

## 联系方式
如有问题或建议，请联系开发团队。

---

**注意**: 在生产环境中使用前，请务必解决密码明文存储的安全问题！
