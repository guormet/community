import Links from '@/model/Links';
import Post from '@/model/Post';
import config from '@/config';
import moment from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { checkCode, getJWTPayload } from '@/common/Utils';
import User from '@/model/User';
// // method 1
// import { dirExists } from '@/common/Utils';
// method 2
import mkdir from 'make-dir';

class ContentController {
  /**
   * 文章列表
   * @param {} ctx
   */
  async getPostList (ctx) {
    const body = ctx.query;

    // // 测试数据
    // const post = new Post({
    //   title: 'String test 2',
    //   content: 'String test 2',
    //   catalog: 'share',
    //   fav: 33,
    //   isEnd: '0',
    //   reads: '0',
    //   answer: '0',
    //   status: '0',
    //   isTop: '0',
    //   sort: '0',
    //   tags: []
    // });

    // const temp = await post.save();
    // console.log('getPostList ~ temp', temp);
    const sort = body.sort ? body.sort : 'created';
    const page = body.page ? parseInt(body.page) : 0;
    const limit = body.limit ? parseInt(body.limit) : 20;
    const options = {};
    if (typeof body.catalog !== 'undefined' && body.catalog !== '') {
      options.catalog = body.catalog;
    }
    if (typeof body.tag !== 'undefined' && body.tag !== '') {
      options.tags = { $elemMatch: { name: body.tag } };
    }
    if (typeof body.isTop !== 'undefined') {
      options.isTop = body.isTop;
    }
    if (typeof body.status !== 'undefined' && body.status !== '') {
      options.isEnd = body.status;
    }
    const result = await Post.getList(options, sort, page, limit);
    ctx.body = {
      code: 200,
      data: result,
      msg: '获取文章列表成功'
    };
  }

  /**
   * 查询友链
   * @param {} ctx
   */
  async getLinks (ctx) {
    const result = await Links.find({ type: 'links' });
    ctx.body = {
      code: 200,
      data: result
    };
  }

  /**
   * 查询温馨提醒
   * @param {} ctx
   */
  async getTips (ctx) {
    const result = await Links.find({ type: 'tips' });
    ctx.body = {
      code: 200,
      data: result
    };
  }

  /**
   * 本周热议
   * @param {} ctx
   */
  async getTopWeek (ctx) {
    const result = await Post.getTopWeek();
    ctx.body = {
      code: 200,
      data: result
    };
  }

  /**
   * 上传图片
   * @param {*} ctx
   */
  async uploadImg (ctx) {
    const file = ctx.request.files.file;
    // 图片名称、图片格式、存储的位置，返回前台一可以读取的路径
    const ext = file.originalFilename.split('.').pop();
    const dir = `${config.uploadPath}/${moment().format('YYYYMMDD')}`;
    // 判断路径是否存在，不存在则创建
    await mkdir(dir);
    // 存储文件到指定的路径
    // 给文件一个唯一的名称
    const picname = uuidv4();
    const destPath = `${dir}/${picname}.${ext}`;
    const reader = fs.createReadStream(file.filepath);
    const upStream = fs.createWriteStream(destPath);
    const filePath = `/${moment().format('YYYYMMDD')}/${picname}.${ext}`;

    // method 1
    reader.pipe(upStream);

    // method 2
    // const stat = fs.statSync(file.filepath);

    // let totalLength = 0;
    // reader.on('data', (chunk) => {
    //   totalLength += chunk.length;
    //   if (upStream.write(chunk) === false) {
    //     reader.pause();
    //   }
    // });

    // reader.on('drain', () => {
    //   reader.resume();
    // });

    // reader.on('end', () => {
    //   upStream.end();
    // });

    ctx.body = {
      code: 200,
      msg: '图片上传成功',
      data: filePath
    };
  }

  /**
   * 添加新贴
   * @param {*} ctx
   * @returns
   */
  async addPost (ctx) {
    const { body } = ctx.request;
    const sid = body.sid;
    const code = body.code;
    // 验证图片验证码的时效性、正确性
    const result = await checkCode(sid, code);
    if (result) {
      const obj = await getJWTPayload(ctx.header.authorization);
      // 判断用户的积分数是否 > fav，否则，提示用户积分不足发贴
      // 用户积分足够的时候，新建Post，减除用户对应的积分
      const user = await User.findByID({ _id: obj._id });
      if (user.favs < body.fav) {
        ctx.body = {
          code: 501,
          msg: '积分不足'
        };
        return;
      } else {
        await User.updateOne({ _id: obj._id }, { $inc: { favs: -body.fav } });
      }
      const newPost = new Post(body);
      newPost.uid = obj._id;
      const result = await newPost.save();
      ctx.body = {
        code: 200,
        msg: '成功的保存的文章',
        data: result
      };
    } else {
      // 图片验证码验证失败
      ctx.body = {
        code: 500,
        msg: '图片验证码验证失败'
      };
    }
  }
}

export default new ContentController();
