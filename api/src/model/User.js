import mongoose from '../config/DBHelper';
import moment from 'dayjs';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  // 用户名，这个是邮件账号
  username: { type: String, index: { unique: true }, sparse: true },
  // 密码
  password: { type: String },
  // 昵称
  name: { type: String },
  // 注册时间
  created: { type: Date },
  // 更新时间
  updated: { type: Date },
  // 用户积分
  favs: { type: Number, default: 100 },
  // 默认，0-男， 1-女
  gender: { type: String, default: '' },
  // 角色, user-普通用户，admin-管理员, super_admin超级管理员
  roles: { type: Array, default: [ 'user' ] },
  // 用户的头像
  pic: { type: String, default: '/img/header.jpg' },
  // 手机号码
  mobile: { type: String, match: /^1[3-9](\d{9})$/, default: '' },
  // 是否被禁用，0-正常，1-禁言，2-账号禁用
  status: { type: String, default: '0' },
  // 个性签名
  regmark: { type: String, default: '' },
  // 城市
  location: { type: String, default: '' },
  // 是否是Vip用户， 0-普通用户，1-会员用户，2-7 定义成vip的level
  isVip: { type: String, default: '0' },
  // 签到次数
  count: { type: Number, default: 0 }
});

UserSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss');
  next();
});

UserSchema.pre('update', function (next) {
  this.updated = moment().format('YYYY-MM-DD HH:mm:ss');
  next();
});

UserSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Error: Mongoose has a duplicate key.'));
  } else {
    next(error);
  }
});

UserSchema.statics = {
  findByID: function (id) {
    return this.findOne({ _id: id }, {
      password: 0,
      username: 0,
      mobile: 0
    });
  }
};
const UserModel = mongoose.model('users', UserSchema);

export default UserModel;
