import Links from '@/model/Links';
import Post from '@/model/Post';

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
}

export default new ContentController();
