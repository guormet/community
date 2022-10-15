import axios from '@/utils/request';
import qs from 'qs';


/**
 * 用户签到
 * @returns 签到信息
 */
 const userSign = () => axios.get('/user/fav');

 /**
  * 更新用户基本资料
  * @param {Object} data 用户基本资料信息
  * @returns 状态
  */
  const updateUserInfo = (data) => axios.post('/user/basic', data);

  /**
   * 确认更新用户登录邮箱
   * @param {} data 
   * @returns 
   */
  const updateUsername = (data) => axios.get('/public/reset-email?' + qs.stringify(data));

  /**
   * 修改密码
   * @param {} data 
   * @returns 
   */
  const changePasswd = (data) => axios.post('/user/change-password', data);

   
   
  // 设置收藏 & 取消收藏
  const addCollect = (data) => axios.get('/user/setCollect?' + qs.stringify(data));

  // 获取收藏列表
  const getCollect = (data) => axios.get('/user/collect?' + qs.stringify(data));

  // 获取发表的文章列表
  const getPostListByUid = (data) => axios.get('/user/post?' + qs.stringify(data));

  // 获取用户最近的发表文章列表
  const getPostPublic = (data) => axios.get('/public/latestPost?' + qs.stringify(data));

  // 删除指定文章列表
  const deletePostByUid = (data) => axios.get('/user/deletePost?' + qs.stringify(data));

  // 获取用户的基本信息
  const getInfo = (data) => axios.get('/public/info?' + qs.stringify(data));

  // 获取用户最近评论列表
  const getCommentList = (data) => axios.get('/public/latestComment?' + qs.stringify(data));

  // 获取用户未读消息
  const getMsg = (data) => axios.get('/user/getmsg?' + qs.stringify(data));

  // 设置用户未读消息
  const setMsg = (data) => axios.get('/user/setmsg?' + qs.stringify(data));

export {
  userSign,
  updateUserInfo,
  updateUsername,
  changePasswd,
  getCollect,
  addCollect,
  getPostListByUid,
  getPostPublic,
  deletePostByUid,
  getInfo,
  getCommentList,
  getMsg,
  setMsg
};
