const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一的登录验证函数
const loginCheck = req => {
  if (!req.session.username) {
    return Promise.resolve(
      new ErrorModel('尚未登录')
    )
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''
    if (req.query.isadmin) {
      const loginCheckResult = loginCheck(req)
      if (loginCheckResult) return loginCheckResult
      author = req.session.username
    }
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDetail(id)
    return result.then(detailData => {
      return new SuccessModel(detailData)
    })
  }

  // 新增博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    // 判断是否登录
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) return loginCheckResult

    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(blogData => {
      return new SuccessModel(blogData, '新增博客成功')
    })
  }

  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    // 判断是否登录
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) return loginCheckResult
    
    const { title, content } = req.body
    const result = updateBlog(id, title, content)
    return result.then(val => {
      if (val) {
        return new SuccessModel(val, '更新博客成功')
      } else {
        return new ErrorModel('更新博客失败')
      }
    })
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/delete') {
    // 判断是否登录
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) return loginCheckResult

    const author = req.session.username
    const result = deleteBlog(id, author)
    return result.then(val => {
      if (val) {
        return new SuccessModel(val, '删除成功')
      } else {
        return new ErrorModel('删除博客失败')
      }
    })
  }
}

module.exports = handleBlogRouter