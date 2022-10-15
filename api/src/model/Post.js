import mongoose from '../config/DBHelper';
import moment from 'dayjs';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  // 用户ID
  uid: { type: String, ref: 'users' },
  // 文章标题
  title: { type: String },
  // 文章内容
  content: { type: String },
  // now() 创建时间时间
  created: { type: Date },
  // 帖子分类，index-全部，ask-提问, advise-建议, discuss-交流, share-分享, logs-动态, notice-公告
  catalog: { type: String },
  // 帖子积分
  fav: { type: String },
  // 0-未结束，1-已结贴
  isEnd: { type: String, default: '0' },
  // 阅读记数
  reads: { type: Number, default: 0 },
  // 回答记数
  answer: { type: Number, default: 0 },
  // 0-打开回复，1-关闭回复
  status: { type: String, default: '0' },
  // 0-未置顶，1-已置顶
  isTop: { type: String, default: '0' },
  // 置顶排序
  sort: { type: String, default: '100' },
  // 文章的标签, 精华，加精, etc
  tags: {
    type: Array,
    default: [
      // {
      //   name: '',
      //   class: ''
      // }
    ]
  }
});
PostSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss');
  next();
});
PostSchema.statics = {
  /**
   * 获取文章列表数据
   * @param {Object} options 筛选条件
   * @param {String} sort 排序方式
   * @param {Number} page 分页页数
   * @param {Number} limit 分页条数
   * @returns 列表数据
   */
  getList: function (options, sort, page, limit) {
    return this.find(options)
      .sort({ [sort]: -1 })
      .skip(page * limit)
      .limit(limit)
      .populate({
        path: 'uid',
        select: 'name isVip pic'
      });
  },
  /**
   * 本周热议
   * @returns 本周热议数据
   */
  getTopWeek: function () {
    return this.find({
      created: {
        $gte: moment().subtract(7, 'day')
      }
    }, {
      answer: 1,
      title: 1
    }).sort({ answer: -1 }).limit(15);
  }
};
const PostModel = mongoose.model('post', PostSchema);

export default PostModel;
