const EXEC = require('../db/mysql')

/**
 * 登录
 * @param {String} username 
 * @param {String} password 
 */
const userlogin = (username, password) => {
  let sql = `select username, realname from users where username = '${username}' and password = '${password}';`
  return EXEC(sql).then(rows => {
    return rows[0] || {}
  })
}

/**
 * 查询用户列表
 * @returns {Promise}
 */
const userList = () => {
  let sql = `select id, username, realname from users;`
  return EXEC(sql)
}

/**
 * 根据 id 查询用户
 * @param {Number} id 
 * @returns {Promise}
 */
const getUser = id => {
  let sql = `select id, username, realname from users where id = '${id}';`
  return EXEC(sql).then(rows => {
    return rows[0]
  })
}

/**
 * 新增用户
 * @param {String} username 
 * @param {String} password 
 * @param {String} realname 
 * @returns {Promise}
 */
const addUser = (username, password, realname) => {
  let sql = `insert into users (username, password, realname) values ('${username}', '${password}', '${realname}');`
  return EXEC(sql).then(data => {
    return {
      id: data.insertId
    }
  })
}

/**
 * 修改用户
 * @param {Number} id 
 * @param {Object} option 
 * @returns {Promise}
 */
const updateUser = (id, option = {}) => {
  let sql = `update users set `
  const arr = Object.keys(option)
  arr.map((item, index) => {
    if (index === arr.length -1) {
      sql += `${item}='${option[item]}' ` 
    } else {
      sql += `${item}='${option[item]}', ` 
    }
  })
  sql += `where id='${id}';`
  return EXEC(sql).then(data => {
    if (data.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  userlogin,
  userList,
  getUser,
  addUser,
  updateUser
}