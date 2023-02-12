import Router from 'koa-router';
import publicController from '@/api/PublicController';
import contentController from '@/api/ContentController';
import userController from '@/api/UserController';
import commentsController from '@/api/CommentsController';

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
// 获取文章详情
router.get('/content/detail', contentController.getPostDetail);
// 确认修改邮件
router.get('/reset-email', userController.updateUsername);
// 获取评论列表
router.get('/comments', commentsController.getComments);
// 获取热门评论
router.get('/getCommentsCount', commentsController.getCommentsCount);
// 获取最新评论
router.get('/getNewComments', commentsController.getNewComments);

export default router;
