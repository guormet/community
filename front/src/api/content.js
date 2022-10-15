import axios from '@/utils/request';
import qs from 'qs';
import store from '@/store';

/**
 * 读取文章列表
 * @param {Object} option 读取文章列表参数
 * @returns 文章列表
 */
const getList = (option) => axios.get('/public/list?' + qs.stringify(option));
/**
 * 温馨提示
 * @returns 温馨提示内容
 */
const getTips = () => axios.get('/public/getTips');
/**
 * 友情链接
 * @returns 友情链接内容
 */
const getLinks = () => axios.get('/public/getLinks');
/**
 * 本周热议
 * @returns 本周热议内容
 */
const getTopWeek = () => axios.get('/public/getTopWeek');
/**
 * 图片上传接口
 * @param {*} formData 
 * @returns 
 */
const uploadImg = (formData) => axios.post('/content/upload', formData);
/**
 * 发贴接口
 * @param {*} data 
 * @returns 
 */
const addPost = (data) => axios.post('/content/add', { ...data });


/**
 * 获取文章详情
 * @param {*} tid 
 * @returns 
 */
const getDetail = (tid) => {
  const token = store.state.token;
  let headers = {};
  if (token !== '') {
    headers = {
      headers: {
        'Authorization': 'Bearer ' + store.state.token
      }
    };
  }
  return axios.get('/public/content/detail?tid=' + tid, headers);
};
export {
  getList,
  getTips,
  getLinks,
  getTopWeek,
  uploadImg,
  addPost,
  getDetail
};
