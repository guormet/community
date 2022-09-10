import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import store from './store';
import jwt from 'jsonwebtoken';
import moment from 'dayjs';
const Login = () => import(/* webpackChunkName: 'login' */ './views/Login.vue');
const Reg = () => import(/* webpackChunkName: 'reg' */ './views/Reg.vue');
const Forget = () => import(/* webpackChunkName: 'forget' */ './views/Forget.vue');
const Index = () => import(/* webpackChunkName: 'index' */ './views/channels/Index.vue');
const Template1 = () => import(/* webpackChunkName: 'template1' */ './views/channels/Template1.vue');
const Center = () => import(/* webpackChunkName: 'center' */ './views/Center.vue');
const UserCenter = () => import(/* webpackChunkName: 'user-center' */ './components/user/Center.vue');
const UserMsg = () => import(/* webpackChunkName: 'user-msg' */ './components/user/Msg.vue');
const UserOthers = () => import(/* webpackChunkName: 'user-others' */ './components/user/Others.vue');
const UserSettings = () => import(/* webpackChunkName: 'user-settings' */ './components/user/Settings.vue');
const UserPosts = () => import(/* webpackChunkName: 'user-posts' */ './components/user/Posts.vue');
const User = () => import(/* webpackChunkName: 'user' */ './components/user/User.vue');
const Accounts = () => import(/* webpackChunkName: 'accounts' */ './components/user/common/Accounts.vue');
const MyInfo = () => import(/* webpackChunkName: 'my-info' */ './components/user/common/MyInfo.vue');
const Password = () => import(/* webpackChunkName: 'password' */ './components/user/common/Password.vue');
const PicUpload = () => import(/* webpackChunkName: 'pic-upload' */ './components/user/common/PicUpload.vue');
const MyCollection = () => import(/* webpackChunkName: 'My-collection' */ './components/user/common/MyCollection.vue');
const MyPost = () => import(/* webpackChunkName: 'My-post' */ './components/user/common/MyPost.vue');

Vue.use(Router);

const router = new Router({
  linkExactActiveClass: 'layui-this',
  // linkActiveClass: 'layui-this',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'index',
          component: Index
        },
        {
          path: '/index/:catalog',
          name: 'catalog',
          component: Template1
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg,
      beforeEnter: (to, from, next) => {
        if (from.name === 'login') {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    },
    {
      path: '/user/:uid',
      name: 'home',
      props: true,
      component: User
    },
    {
      path: '/center',
      component: Center,
      meta: { requiresAuth: true },
      linkActiveClass: 'layui-this',
      children: [
        {
          path: '',
          name: 'center',
          component: UserCenter
        },
        {
          path: 'set',
          component: UserSettings,
          children: [
            {
              path: '',
              name: 'info',
              component: MyInfo
            },
            {
              path: 'password',
              name: 'password',
              component: Password
            },
            {
              path: 'accounts',
              name: 'accounts',
              component: Accounts
            },
            {
              path: '/picUpload',
              name: 'picUpload',
              component: PicUpload
            }
          ]
        },
        {
          path: 'posts',
          component: UserPosts,
          children: [
            {
              path: '',
              name: 'myPost',
              component: MyPost
            },
            {
              path: 'myCollection',
              name: 'myCollection',
              component: MyCollection
            }
          ]
        },
        {
          path: 'msg',
          name: 'msg',
          component: UserMsg
        },
        {
          path: 'others',
          name: 'others',
          component: UserOthers
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (token !== '' && token !== null) {
    const payload = jwt.decode(token);
    // console.log(payload);
    // console.log(moment().isBefore(moment(payload.exp * 1000)));
    // 如果token时间是当前时间之前的，则执行保存
    if (moment().isBefore(moment(payload.exp * 1000))) {
      // 取localstorage里面缓存的token信息+用户信息
      store.commit('setToken', token);
      store.commit('setUserInfo', userInfo);
      store.commit('setIsLogin', true);
    } else {
      localStorage.clear();
    }
    
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isLogin = store.state.isLogin;
    // 需要用户登录的页面进行区别
    if (isLogin) {
      // 已经登录的状态
      next();
    } else {
      // 未登录的状态
      next('/login');
    }
  } else {
    // 公共页面，不需要用户登录
      next();
  }
});
export default router;