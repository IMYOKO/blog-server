const querystring = require('querystring')
const REDIS_FN = require('./src/db/redis')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// // session 数据
// let SESSION_DATA = {}

// 设置 cookie 的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

// 处理 post data
const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      // 数据为空
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
  return promise
}

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-Type', 'application/json')

  // 处理url
  const url = req.url
  req.path = url.split('?')[0]

  // 解析query
  req.query = querystring.parse(url.split('?')[1])

  // 解析 cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) return
    const arr = item.split('=')
    const key = arr[0].trim()
    const value = arr[1].trim()
    req.cookie[key] = value
  })

  // // 解析 session
  // let needSetCookie = false
  // let userId = req.cookie.userId
  // if (userId) {
  //   if (!SESSION_DATA[userId]) SESSION_DATA[userId] = {}
  // } else {
  //   needSetCookie = true
  //   userId = `${Date.now()}_${Math.random()}`
  //   SESSION_DATA[userId] = {}
  // }
  // req.session = SESSION_DATA[userId]

  // 解析 session (使用 redis)
  let needSetCookie = false
  let userId = req.cookie.userId
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    // 初始化 redis 中 session 的值
    REDIS_FN.SET(userId, {})
  }
  // 获取 session
  req.sessionId = userId
  REDIS_FN.GET(req.sessionId).then(sessionData => {
    if (sessionData == null) {
      // 初始化 redis 中 session 的值
      REDIS_FN.SET(req.sessionId, {})
      req.session = {}
    } else {
      req.session = sessionData
    }

    return getPostData(req)
  })
  .then(postData => { // 处理 post data
    req.body = postData

    // 处理 blog 路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(blogData))
      })
      return
    }
  
    // 处理 user 路由
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        if (needSetCookie) {
          res.setHeader('Set-cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(userData))
      })
      return
    }
  
    // 404
    res.writeHead(404, 'Content-Type', 'text/plain')
    res.write('404 NOT FOUND \n')
    res.end()
  })

}

module.exports = serverHandle