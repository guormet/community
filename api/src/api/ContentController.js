import Links from '@/model/Links';
import Post from '@/model/Post';
import config from '@/config';
import moment from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { checkCode, getJWTPayload } from '@/common/Utils';
import User from '@/model/User';
import UserCollect from '@/model/UserCollect';
import PostHistory from '@/model/PostHistory';
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

  /**
   * 更新帖子
   * @param {*} ctx 
   */
  async updatePost (ctx) {
    const { body } = ctx.request;
    const sid = body.sid;
    const code = body.code;
    // 验证图片验证码的时效性、正确性
    const result = await checkCode(sid, code);
    if (result) {
      const obj = await getJWTPayload(ctx.header.authorization);
      // 判断帖子作者是否为本人
      const post = await Post.findOne({ _id: body.tid });
      // 判断帖子是否结贴
      if (post.uid === obj._id && post.isEnd === '0') {
        const result = await Post.updateOne({ _id: body.tid }, body);
        if (result.acknowledged) {
          ctx.body = {
            code: 200,
            data: result,
            msg: '更新帖子成功'
          };
        } else {
          ctx.body = {
            code: 500,
            data: result,
            msg: '编辑帖子，更新失败'
          };
        }
      } else {
        ctx.body = {
          code: 401,
          msg: '没有操作的权限'
        };
      }
    } else {
      // 图片验证码验证失败
      ctx.body = {
        code: 500,
        msg: '图片验证码验证失败'
      };
    }
  }

  async updatePostByTid (ctx) {
    const { body } = ctx.request;
    const result = await Post.updateOne({ _id: body._id }, body);
    if (result.acknowledged) {
      ctx.body = {
        code: 200,
        data: result,
        msg: '更新帖子成功'
      };
    } else {
      ctx.body = {
        code: 500,
        data: result,
        msg: '编辑帖子，更新失败'
      };
    }
  }

  /**
   * 获取文章详情
   * @param {*} ctx 
   * @returns 
   */
  async getPostDetail (ctx) {
    const params = ctx.query;
    if (!params.tid) {
      ctx.body = {
        code: 500,
        msg: '文章id为空'
      };
      return;
    }
    const post = await Post.findByTid(params.tid);
    if (!post) {
      ctx.body = {
        code: 200,
        data: {},
        msg: '查询文章详情成功'
      };
      return;
    }
    let isFav = 0;
    // 判断用户是否传递Authorization的数据，即是否登录
    if (
      typeof ctx.header.authorization !== 'undefined' &&
      ctx.header.authorization !== ''
    ) {
      const obj = await getJWTPayload(ctx.header.authorization);
      const userCollect = await UserCollect.findOne({
        uid: obj._id,
        tid: params.tid
      });
      if (userCollect && userCollect.tid) {
        isFav = 1;
      }
      await PostHistory.addOrUpdate(obj._id, params.tid); // 添加浏览记录
    }
    const newPost = post.toJSON();
    newPost.isFav = isFav;
    // 更新文章阅读记数
    const result = await Post.updateOne(
      { _id: params.tid },
      { $inc: { reads: 1 } }
    );

    if (post._id && result.acknowledged) {
      ctx.body = {
        code: 200,
        data: newPost,
        msg: '查询文章详情成功'
      };
    } else {
      ctx.body = {
        code: 500,
        msg: '获取文章详情失败'
      };
    }
    // const post = await Post.findOne({ _id: params.tid })
    // const result = rename(post.toJSON(), 'uid', 'user')
  }

  
  /**
   * 获取用户发贴记录
   * @param {*} ctx 
   */
  async getPostByUid (ctx) {
    const params = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const result = await Post.getListByUid(
      obj._id,
      params.page,
      params.limit ? parseInt(params.limit) : 10
    )
    const total = await Post.countByUid(obj._id)
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
   * 删除发贴记录
   * @param {*} ctx 
   */
  async deletePostByUid (ctx) {
    const params = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const post = await Post.findOne({ uid: obj._id, _id: params.tid })
    if (post.id === params.tid && post.isEnd === '0') {
      await ContentController.prototype.deletePost(ctx)
      // const result = await Post.deleteOne({ _id: params.tid })
      // if (result.ok === 1) {
      //   ctx.body = {
      //     code: 200,
      //     msg: '删除成功'
      //   }
      // } else {
      //   ctx.body = {
      //     code: 500,
      //     msg: '执行删除失败！'
      //   }
      // }
    } else {
      ctx.body = {
        code: 500,
        msg: '删除失败，无权限！'
      }
    }
  }
  /**
   * 获取用户发贴记录
   * @param {*} ctx 
   */
  async getPostPublic (ctx) {
    const params = ctx.query
    const result = await Post.getListByUid(
      params.uid,
      params.page,
      params.limit ? parseInt(params.limit) : 10
    )
    const total = await Post.countByUid(params.uid)
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
}

export default new ContentController();
