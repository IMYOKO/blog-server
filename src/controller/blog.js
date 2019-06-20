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
 */
const getDetail = id => {
  return {
    id: 1,
    title: '标题1',
    content: '内容1',
    createTime: 1560948103556,
    author: 'yoko'
  }
}

/**
 * 新增博客
 * @param {Object} data 
 * @param {String} title 
 * @param {String} content 
 */
const newBlog = (data = {}) => {
  // console.log('data: ', data)
  return {
    id: 3
  }
}

/**
 * 更新博客
 * @param {*} id 
 * @param {*} data 
 */
const updateBlog = (id, data = {}) => {
  // console.log('updateBlog: ', id, data)
  return true
}

const deleteBlog = id => {
  console.log('deleteBlog: ', id)
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}