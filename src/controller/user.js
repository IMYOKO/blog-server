/**
 * 登录
 * @param {String} userName 
 * @param {String} passWord 
 */
const userlogin = (userName, passWord) => {
  console.log('user: ', userName, passWord)
  if (userName === 'yoko' && passWord === '123456') {
    return true
  }
  return false
}

module.exports = {
  userlogin
}