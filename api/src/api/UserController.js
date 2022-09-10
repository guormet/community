import SignRecord from '@/model/SignRecord';
import User from '@/model/User';
import { getJWTPayload } from '@/common/Utils';
import moment from 'dayjs';
import ErrorCode from '@/common/ErrorCode';

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
}

export default new UserController();
