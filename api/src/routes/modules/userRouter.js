import Router from 'koa-router';
import userController from '@/api/UserController';

const router = new Router();
router.prefix('/user');

// 用户签到
router.get('/fav', userController.userSign);
// 更新用户信息
router.post('/basic', userController.updateUserInfo);
// 修改密码
router.post('/change-password', userController.changePasswd);

export default router;
