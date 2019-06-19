/**
 * 获取博客列表
 * @param {String} author 
 * @param {String} keyword 
 */
const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '标题1',
      content: '内容1',
      creatTime: 1560948103556,
      author: 'yoko'
    },
    {
      id: 2,
      title: '标题2',
      content: '内容2',
      creatTime: 1560948152988,
      author: 'yoko2'
    }
  ]
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
    creatTime: 1560948103556,
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