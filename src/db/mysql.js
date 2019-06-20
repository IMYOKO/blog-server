const MYSQL = require('mysql')
const MYSQL_CONFING = require('../conf/db')

// 创建连接对象
const CONNECTION = MYSQL.createConnection(MYSQL_CONFING)

// 开始连接
CONNECTION.connect()

/**
 * 统一执行 sql 的函数
 * @param {SQL} sql 
 * @returns {Promise}
 */
const exec = sql => {
  const promise = new Promise((reslove, reject) => {
    CONNECTION.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      reslove(result)
    })
  })
  return promise
}

module.exports = exec