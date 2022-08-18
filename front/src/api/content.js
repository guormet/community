import axios from '@/utils/request';
import qs from 'qs';

/**
 * 读取文章列表
 * @param {Object} option 读取文章列表参数
 * @returns 文章列表
 */
const getList = (option) => {
  return axios.get('/public/list?' + qs.stringify(option));
};
/**
 * 温馨提示
 * @returns 温馨提示内容
 */
const getTips = () => {
  return axios.get('/public/tips');
};
/**
 * 友情链接
 * @returns 友情链接内容
 */
const getLinks = () => {
  return axios.get('/public/links');
};
/**
 * 本周热议
 * @returns 本周热议内容
 */
const getTopWeek = () => {
  return axios.get('/public/getTopWeek');
};

export {
  getList,
  getTips,
  getLinks,
  getTopWeek
};
