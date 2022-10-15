import Router from 'koa-router';
import loginController from '@/api/LoginController';

const router = new Router();

router.prefix('/login');

// 忘记密码
router.post('/forget', loginController.forget);
// 登录
router.post('/login', loginController.login);
// 注册
router.post('/reg', loginController.reg);
// 重置密码
router.post('/reset', loginController.reset);

export default router;
