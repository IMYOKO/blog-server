const EXEC = require('../db/mysql')

/**
 * 获取博客列表
 * @param {String} author 
 * @param {String} keyword 
 * @returns {Promise}
 */
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1 = 1 `
  if (author) sql += `and author = '${author}' `
  if (keyword) sql += `and title like '%${author}%' `
  sql += `order by createtime desc;`

  return EXEC(sql)
}

/**
 * 获取详情
 * @param {Number} id 
 * @returns {Promise}
 */
const getDetail = id => {
  let sql = `select * from blogs where id = '${id}';`
  return EXEC(sql).then(rows => {
    return rows[0]
  })
}

/**
 * 新增博客
 * @param {Object} data 
 * @param {String} title 
 * @param {String} content 
 * @returns {Promise}
 */
const newBlog = (option = {}) => {
  const title = option.title
  const content = option.content
  const author = option.author
  const createtime = Date.now()

  let sql = `insert into blogs (title, content, author, createtime) values ('${title}', '${content}', '${author}', '${createtime}')`

  return EXEC(sql).then(data => {
    return {
      id: data.insertId
    }
  })
}

/**
 * 更新博客
 * @param {Number} id 
 * @param {String} title 
 * @param {String} content 
 * @returns {Promise}
 */
const updateBlog = (id, title, content) => {
  let sql = `update blogs set title='${title}', content='${content}' where id='${id}';`
  // const arr = Object.keys(option)
  // arr.map((item, index) => {
  //   if (index === arr.length -1) {
  //     sql += `${item}='${option[item]}' ` 
  //   } else {
  //     sql += `${item}='${option[item]}', ` 
  //   }
  // })
  // sql += `where id='${id}';`
  return EXEC(sql).then(data => {
    if (data.affectedRows > 0) {
      return true
    }
    return false
  })
}

const deleteBlog = (id, author) => {
  let sql = `delete from blogs where id = '${id}' and author = '${author}';`

  return EXEC(sql).then(data => {
    if (data.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}