import mongoose from '../config/DBHelper';
import moment from 'dayjs';

const Schema = mongoose.Schema;

const LinksSchema = new Schema({
  // 标题
  title: { type: String, default: '' },
  // 链接
  link: { type: String, default: '' },
  // links - 友链， tips - 温馨提醒
  type: { type: String, default: '' },
  // 创建时间
  created: { type: Date },
  // 是否置顶
  isTop: { type: String, default: '' },
  // 排序编号
  sort: { type: String, default: '' }
});

LinksSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss');
  next();
});
const Links = mongoose.model('links', LinksSchema);

export default Links;
