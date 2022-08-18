import axios from '@/utils/request';

/**
 * 获取验证码接口
 * @param {String} sid 唯一标识
 * @returns 验证码信息
 */
 const getCode = (sid) => {
  // axios.request({
  //  method: 'get',
  //  url: '/getCaptcha'
  // })
  return axios.get('/public/getCaptcha', {
    params: {
      sid: sid
    }
  });
};

export {
  getCode
};