const { userlogin, userList, getUser, addUser, updateUser } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const method = req.method
  const id = req.query.id
  
  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    const result = userlogin(username, password)
    return result.then(val => {
      console.log(val)
      if (val.username) {
        return new SuccessModel(val, '登录成功')
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }

  // 查询用户列表
  if (method === 'GET' && req.path === '/api/user/list') {
    const result = userList()
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

  // 根据 id 查询用户
  if (method === 'GET' && req.path === '/api/user/id') {
    const result = getUser(id)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

  // 新增用户
  if (method === 'POST' && req.path === '/api/user/new') {
    const { username, password, realname } = req.body
    const result = addUser(username, password, realname)
    return result.then(res => {
      return new SuccessModel(res)
    })
  }

  // 修改用户
  if (method === 'POST' && req.path === '/api/user/update') {
    const result = updateUser(id, req.body)
    return result.then(res => {
      return new SuccessModel(res)
    })
  }
}

module.exports = handleUserRouter