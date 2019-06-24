const REDIS = require('redis')
const { REDIS_CONFING } = require('../conf/db')

// 创建客户端
const REDIS_CLIENT = REDIS.createClient(REDIS_CONFING.port, REDIS_CONFING.host)
REDIS_CLIENT.on('error', err => {
  console.error(err)
})

/**
 * set 方法
 * @param {String} key 
 * @param {String} value 
 */
const SET = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  REDIS_CLIENT.set(key, value, REDIS.print)
}

/**
 * get 方法
 * @param {String} key 
 * @returns {Promise}
 */
const GET = key => {
  const promise = new Promise((reslove, reject) => {
    REDIS_CLIENT.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        reslove(null)
        return
      }
      try {
        // 如果之前设置的是对象，返回一个对象格式
        reslove(JSON.parse(val))
      } catch (e) {
        reslove(val)
      }
    })
  })
  return promise
}

module.exports = {
  SET,
  GET
}