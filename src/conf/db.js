// 获取环境变量
const env = process.env.NODE_ENV

// 配置
let MYSQL_CONFING

if (env === 'development') {
  MYSQL_CONFING = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'yoko.wang190123',
    database: 'myblog'
  }
}

if (env === 'production') {
  MYSQL_CONFING = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'yoko.wang190123',
    database: 'myblog'
  }
}

module.exports = MYSQL_CONFING