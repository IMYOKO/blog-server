const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const detailData = getDetail(id)
    return new SuccessModel(detailData)
  }

  // 新增博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const blogData = newBlog(req.body)
    return new SuccessModel(blogData, '新增博客成功')
  }

  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, req.body)
    if (result) {
      return new SuccessModel(result, '更新博客成功')
    } else {
      return new ErrorModel('更新博客失败')
    }
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/delete') {
    const result = deleteBlog(id)
    if (result) {
      return new SuccessModel(result, '删除成功')
    } else {
      return new ErrorModel('删除博客失败')
    }
  }
}

module.exports = handleBlogRouter