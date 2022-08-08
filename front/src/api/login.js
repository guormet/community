import axios from '@/utils/request'
/**
 * 找回密码接口
 * @param {Object} option 用户信息（邮箱、验证码）
 * @returns 是否成功发送邮件信息
 */
const forget = (option) => {
  return axios.post('/login/forget', {
    ...option
  })
}
/**
 * 用户登录接口
 * @param {Object} loginInfo 用户登录信息(账号、密码、验证码、验证码唯一标识)
 * @returns 登录信息
 */
const login = (loginInfo) => {
  return axios.post('/login/login', {
    ...loginInfo
  })
}

export {
  forget,
  login
}
