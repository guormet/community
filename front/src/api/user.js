import axios from '@/utils/request';
import store from '@/store';


/**
 * 用户签到
 * @returns 签到信息
 */
 const userSign = () => {
  const headers = {
    Authorization: 'Bearer ' + store.state.token,
    'Content-type': 'application/json'
  };
  return axios.get('/user/fav', {
    headers
  });
};

export {
  userSign
};
