import moment from 'dayjs';
import jsonwebtoken from 'jsonwebtoken';
import send from '@/config/MailConfig';
import config from '@/config';
import { checkCode } from '@/common/Utils';
import { aesDecrypt, aesEncrypt } from '@/common/crypto';
import errorCode from '@/common/ErrorCode';
import User from '@/model/User';
import SignRecord from '@/model/SignRecord';
class LoginController {
  /**
   * 找回密码接口（发送邮件）
   * @param {} ctx
   */
  async forget (ctx) {
    const { body } = ctx.request;
    console.log(body);
    try {
      // body.username -> database -> email
      const result = await send({
        code: '1234',
        expire: moment()
          .add(30, 'minutes')
          .format('YYYY-MM-DD HH:mm:ss'),
        email: body.username,
        user: 'Brian'
      });
      ctx.body = {
        code: 200,
        data: result,
        msg: '邮件发送成功'
      };
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * 登录接口
   * @param {} ctx
   */
  async login (ctx) {
    const { body } = ctx.request;
    const code = body.code;
    const sid = body.sid;
    // 图形验证码校验
    const checkCodeResult = await checkCode(sid, code);
    if (checkCodeResult) { // 验证码验证通过
      // 用户名、密码MongoDB查库校验
      const user = await User.findOne({ username: body.username });
      // aes解密
      const inputPwd = await aesDecrypt(body.password, 1);
      const enPwd = await aesDecrypt(user.password, 0);
      if (inputPwd === enPwd) { // 用户名密码校验通过
        const userObj = user.toJSON();
        const arr = [ 'password', 'username', 'roles' ];
        arr.map((item) => {
          delete userObj[item];
          return item;
        });
        const token = jsonwebtoken.sign({ _id: userObj._id }, config.JWT_SECRET, { expiresIn: '1d' });
        // 加入isSign属性校验，默认为未签到false
        const signRecord = await SignRecord.findByUid(userObj._id);
        userObj.isSign = false;
        // 如果有签到记录，且日期与当前日期相等，设为true
        if (signRecord !== null && moment(signRecord.created).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
          userObj.isSign = true;
        }
        userObj.lastSign = signRecord.created;
        ctx.body = {
          code: 200,
          data: userObj,
          token
        };
      } else { // 用户名密码校验失败
        ctx.body = {
          code: 10001,
          msg: errorCode[10001]
        };
      }
    } else { // 验证码验证失败
      ctx.body = {
        code: 10002,
        msg: errorCode[10002]
      };
    }
  }

  /**
   * 注册接口
   * @param {} ctx
   */
  async reg (ctx) {
    const { body } = ctx.request;
    const code = body.code;
    const sid = body.sid;
    let check = true;
    let errorMsg = {};
    // 图形验证码校验
    const checkCodeResult = await checkCode(sid, code);
    if (checkCodeResult) { // 验证码验证通过
      // 用户名MongoDB查库校验
      const User1 = await User.findOne({ username: body.username });
      if (User1 && typeof User1.username !== 'undefined') { // 存在邮箱
        check = false;
        errorMsg = {
          code: 10003,
          msg: errorCode[10003]
        };
      }
      const User2 = await User.findOne({ name: body.name });
      if (User2 && typeof User2.name !== 'undefined') { // 存在昵称
        check = false;
        errorMsg = {
          code: 10004,
          msg: errorCode[10004]
        };
      }

      if (check) { // 不存在用户名/邮箱
        // 密码解密 && 加密
        const pwd = await aesDecrypt(body.password, 1);
        const enPwd = await aesEncrypt(pwd);
        // 插入一条用户数据
        const user = new User({
          username: body.username,
          name: body.name,
          password: enPwd,
          created: moment().format('YYYY-MM-DD HH:mm:ss')
        });
        console.log(0);
        const result = await user.save();
        console.log(111);
        result.password = body.password;
        ctx.body = {
          code: 200,
          data: result,
          msg: '注册成功'
        };
      } else {
        ctx.body = { ...errorMsg };
      }
    } else { // 验证码验证失败
      ctx.body = {
        code: 10002,
        msg: errorCode[10002]
      };
    }
  }
}

export default new LoginController();
