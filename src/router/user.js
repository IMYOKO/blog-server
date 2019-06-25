const { userlogin, userList, getUser, addUser, updateUser } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const REDIS_FN = require('../db/redis')

// 设置 cookie 的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

const handleUserRouter = (req, res) => {
  const method = req.method
  const id = req.query.id

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    // const { username, password } = req.query
    const { username, password } = req.body
    const result = userlogin(username, password)
    return result.then(val => {
      if (val.username) {
        // 设置 session 的值
        req.session.username = val.username
        req.session.realname = val.realname
        res.setHeader('Set-cookie', `userId=${val.id}; path=/; httpOnly; expires=${getCookieExpires()}`)
        // 同步 redis
        REDIS_FN.SET(req.sessionId, req.session)

        return new SuccessModel(val, '登录成功')
      } else {
        res.setHeader('Set-cookie', `userId=; path=/; httpOnly; expires=''`)
        return new ErrorModel('登录失败')
      }
    })
  }

  // 登录测试
  // if (method === 'GET' && req.path === '/api/user/login-test') {
  //   if (req.session.username) {
  //     return Promise.resolve(new SuccessModel({
  //       session: req.session
  //     }))
  //   } else {
  //     return Promise.resolve(new ErrorModel('尚未登录'))
  //   }
  // }

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