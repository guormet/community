import SignRecord from '@/model/SignRecord';
import User from '@/model/User';
import UserCollect from '../model/UserCollect';
import { getJWTPayload } from '@/common/Utils';
import moment from 'dayjs';
import send from '@/config/MailConfig';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import config from '@/config';
import { setValue, getValue } from '@/config/RedisConfig';
import ErrorCode from '@/common/ErrorCode';
import { aesDecrypt, aesEncrypt } from '@/common/crypto';
import Comments from '@/model/Comments'
import qs from 'qs'
import CommentsHands from '@/model/CommentsHands'

class UserController {
  /**
   * 用户签到
   * @param {} ctx
   */
  async userSign (ctx) {
    // 取用户ID
    const obj = await getJWTPayload(ctx.header.authorization);
    // 查询用户上一次签到记录
    const record = await SignRecord.findByUid(obj._id);
    const user = await User.findByID(obj._id);
    let newRecord = {};
    let result = {};
    if (record !== null) {
      // 有历史签到逻辑
      // 判断用户上一次签到记录的created时间是否与今天相同
      // 如果当前时间的日期与用户上一次签到日期相同，说明用户已签到
      if (moment(record.created).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
        ctx.body = {
          code: 10101,
          msg: ErrorCode[10101],
          favs: user.favs,
          count: user.count,
          lastSign: record.created
        };
        return;
      } else {
        // 有上一次的签到记录，并且不与今天相同，进行连续签到判断
        // 如果相同，代表用户是在连续签到
        let count = user.count;
        let fav = 0;
        // 判断签到时间：用户上一次的签到时间等于，当前时间的前一天，说明用户在连续签到
        if (moment(record.created).format('YYYY-MM-DD') === moment().subtract(1, 'days').format('YYYY-MM-DD')) {
          // 连续签到的积分获取逻辑
          count += 1;
          if (count < 5) {
            fav = 5;
          } else if (count >= 5 && count < 15) {
            fav = 10;
          } else if (count >= 15 && count < 30) {
            fav = 15;
          } else if (count >= 30 && count < 100) {
            fav = 20;
          } else if (count >= 100 && count < 365) {
            fav = 30;
          } else if (count >= 365) {
            fav = 50;
          }
          await User.updateOne({ _id: obj._id }, {
            $inc: { favs: fav, count: 1 }
          });
          result = {
            favs: user.favs + fav,
            count: user.count + 1
          };
        } else {
          // 用户中断了一次签到
          // 第n + 1 天签到的时候，需要与第n天的created比较，如果不相等，说明中断了签到
          fav = 5;
          await User.updateOne({ _id: obj._id }, {
            $set: { count: 1 },
            $inc: { favs: fav }
          });
          result = {
            favs: user.favs + fav,
            count: 1
          };
        }
        newRecord = new SignRecord({
          uid: obj._id,
          favs: fav
        });
        await newRecord.save();
      }
    } else {
      // 无签到数据 => 第一次签到
      // 保存用户的签到数据，签到计数 + 积分数据
      await User.updateOne({ _id: obj._id }, {
        $set: { count: 1 },
        $inc: { favs: 5 }
      });
      // 保存用户的签到记录
      newRecord = new SignRecord({
        uid: obj._id,
        favs: 5
      });
      await newRecord.save();
      result = {
        favs: user.favs + 5,
        count: 1
      };
    }
    ctx.body = {
      code: 200,
      msg: '请求成功',
      ...result,
      lastSign: newRecord.created
    };
  }

  /**
   * 更新用户基本信息
   * @param {} ctx
   */
  async updateUserInfo (ctx) {
    const { body } = ctx.request;
    const obj = await getJWTPayload(ctx.header.authorization);
    // 判断用户是否修改了邮箱
    const user = await User.findOne({ _id: obj._id });
    let msg = '';
    if (body.username && body.username !== user.username) {
      // 用户修改了邮箱
      // 发送reset邮件
      // 判断用户的新邮箱是否已经有人注册
      const tmpUser = await User.findOne({ username: body.username });
      if (tmpUser && tmpUser.password) {
        ctx.body = {
          code: 10102,
          msg: ErrorCode[10102]
        };
        return;
      }
      const key = uuidv4();
      setValue(
        key,
        jwt.sign({ _id: obj._id }, config.JWT_SECRET, {
          expiresIn: '30m'
        })
      );
      console.log('body', body);
      await send({
        type: 'email',
        data: {
          key,
          username: body.username
        },
        code: '',
        expire: moment()
          .add(30, 'minutes')
          .format('YYYY-MM-DD HH:mm:ss'),
        email: body.username,
        user: user.name
      });
      msg = '更新基本资料成功，账号修改需要邮件确认，请查收邮件！';
    }
    const arr = [ 'username', 'mobile', 'password' ];
    arr.map((item) => { return delete body[item]; });
    const result = await User.updateOne({ _id: obj._id }, body);
    if (result.matchedCount === 1 && result.acknowledged) {
      ctx.body = {
        code: 200,
        msg: msg === '' ? '更新成功' : msg
      };
    } else {
      ctx.body = {
        code: 9001,
        msg: ErrorCode[9001]
      };
    }
  }

  /**
   * 更新用户名
   * @param {*} ctx
   */
  async updateUsername (ctx) {
    const body = ctx.query;
    if (body.key) {
      const token = await getValue(body.key);
      const obj = getJWTPayload('Bearer ' + token);
      await User.updateOne(
        { _id: obj._id },
        {
          username: body.username
        }
      );
      ctx.body = {
        code: 200,
        msg: '更新用户名成功'
      };
    }
  }

  /**
   * 修改密码接口
   * @param {*} ctx
   */
  async changePasswd (ctx) {
    const { body } = ctx.request;
    const obj = await getJWTPayload(ctx.header.authorization);
    const user = await User.findOne({ _id: obj._id });

    // aes解密
    const inputPwd = await aesDecrypt(body.oldpwd, 1);
    const enPwd = await aesDecrypt(user.password, 0);

    if (inputPwd === enPwd) {
      // 密码加密
      const inputPwd = await aesDecrypt(body.newpwd, 1);
      const newpasswd = await aesEncrypt(inputPwd);
      await User.updateOne({ _id: obj._id }, { $set: { password: newpasswd } });
      ctx.body = {
        code: 200,
        msg: '更新密码成功'
      };
    } else {
      ctx.body = {
        code: 9002,
        msg: ErrorCode[9002]
      };
    }
  }

  /**
   * 设置收藏
   * @param {*} ctx
   */
  async setCollect (ctx) {
    const params = ctx.query;
    const obj = await getJWTPayload(ctx.header.authorization);
    if (parseInt(params.isFav)) {
      // 说明用户已经收藏了帖子
      await UserCollect.deleteOne({ uid: obj._id, tid: params.tid });
      ctx.body = {
        code: 200,
        msg: '取消收藏成功'
      };
    } else {
      const newCollect = new UserCollect({
        uid: obj._id,
        tid: params.tid,
        title: params.title
      });
      const result = await newCollect.save();
      if (result.uid) {
        ctx.body = {
          code: 200,
          data: result,
          msg: '收藏成功'
        };
      }
    }
  }
  
  /**
   * 获取收藏列表
   * @param {*} ctx 
   */
  async getCollectByUid (ctx) {
    const params = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const result = await UserCollect.getListByUid(
      obj._id,
      params.page,
      params.limit ? parseInt(params.limit) : 10
    )
    const total = await UserCollect.countByUid(obj._id)
    if (result.length > 0) {
      ctx.body = {
        code: 200,
        data: result,
        total,
        msg: '查询列表成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '查询列表失败'
      }
    }
  }

  /**
   * 获取用户基本信息
   * @param {*} ctx 
   */
  async getBasicInfo (ctx) {
    const params = ctx.query
    // const obj = await getJWTPayload(ctx.header.authorization)
    const uid = params.uid || ctx._id
    let user = await User.findByID(uid)
    // 取得用户的签到记录 有没有 > today 0:00:00
    if (user) {
      user = user.toJSON()

      const date = moment().format('YYYY-MM-DD')
      const result = await SignRecord.findOne({
        uid: uid,
        created: { $gte: date + ' 00:00:00' }
      })
      if (result && result.uid) {
        user.isSign = true
      } else {
        user.isSign = false
      }
    }
    ctx.body = {
      code: 200,
      data: user,
      msg: '查询成功！'
    }
  }
  
  /**
   * 获取历史消息
   * 记录评论之后，给作者发送消息
   * @param {*} ctx 
   */
  async getMsg (ctx) {
    const params = ctx.query
    const page = params.page ? params.page : 0
    const limit = params.limit ? parseInt(params.limit) : 0
    // 方法一： 嵌套查询 -> aggregate
    // 方法二： 通过冗余换时间
    const obj = await getJWTPayload(ctx.header.authorization)
    const num = await Comments.getTotal(obj._id)
    const result = await Comments.getMsgList(obj._id, page, limit)

    ctx.body = {
      code: 200,
      data: result,
      total: num
    }
  }

  /**
   * 获取历史消息
   * 记录评论之后，给作者发送消息
   * @param {*} ctx 
   */
  async getHands (ctx) {
    const params = ctx.query
    const page = params.page ? params.page : 0
    const limit = params.limit ? parseInt(params.limit) : 0
    // 方法一： 嵌套查询 -> aggregate
    // 方法二： 通过冗余换时间
    const obj = await getJWTPayload(ctx.header.authorization)
    const result = await CommentsHands.getHandsByUid(obj._id, page, limit)

    ctx.body = {
      code: 200,
      data: result
    }
  }
  
  /**
   * 设置已读消息
   * @param {*} ctx 
   */
  async setMsg (ctx) {
    const params = ctx.query
    if (params.id) {
      const result = await Comments.updateOne(
        { _id: params.id },
        { isRead: '1' }
      )
      if (result.ok === 1) {
        ctx.body = {
          code: 200
        }
      }
    } else {
      const obj = await getJWTPayload(ctx.header.authorization)
      const result = await Comments.updateMany(
        { uid: obj._id },
        { isRead: '1' }
      )
      if (result.ok === 1) {
        ctx.body = {
          code: 200
        }
      }
    }
  }

}

export default new UserController();
