import send from '../config/MailConfig'
import moment from 'moment'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config'
import { checkCode } from '@/common/Utils'
import errorCode from '@/common/ErrorCode'

class LoginController {
  constructor() {}
  async forget(ctx) {
    const { body } = ctx.request
    console.log(body)
    try {
      // body.username -> database -> email
      let result = await send({
        code: '1234',
        expire: moment()
          .add(30, 'minutes')
          .format('YYYY-MM-DD HH:mm:ss'),
        email: body.username,
        user: 'Brian',
      })
      ctx.body = {
        code: 200,
        data: result,
        msg: '邮件发送成功',
      }
    } catch (e) {
      console.log(e)
    }
  }
  async login(ctx) {
    const body = ctx.request.query
    let code = body.code
    let sid = body.sid
    let checkUser = false;
    // 图形验证码校验
    if (checkCode(sid, code)) {
      // 用户名、密码校验
      if (checkUser) {

      } else {
        ctx.body = {
          code: 10001,
          msg: errorCode[10001]
        }
      }
    } else {
      ctx.body = {
        code: 10002,
        msg: errorCode[10002]
      }
    }
    let token = jsonwebtoken.sign({_id: 'keaton' }, config.JWT_SECRET, { expiresIn: '1d' })
    ctx.body = {
      code: 200,
      token: token
    }
  }
}

export default new LoginController()
