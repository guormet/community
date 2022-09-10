import Router from 'koa-router';
import publicController from '../api/PublicController';
import contentController from '../api/ContentController';

const router = new Router();
router.prefix('/public');
// 获取图片验证码
router.get('/getCaptcha', publicController.getCaptcha);
// 获取文章列表
router.get('/list', contentController.getPostList);
// 获取友情链接
router.get('/getLinks', contentController.getLinks);
// 获取温馨提醒
router.get('/getTips', contentController.getTips);
// 获取本周热议
router.get('/getTopWeek', contentController.getTopWeek);

export default router;
