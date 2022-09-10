import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {}
  },
  mutations: {
    setSid (state, value) {
      state.sid = value;
    },
    setIsLogin (state, value) {
      state.isLogin = value;
    },
    setToken (state, value) {
      state.token = value;
      localStorage.setItem('token', value);
    },
    setUserInfo (state, value) {
      if (value === '') {
        return; 
      }
      state.userInfo = value;
      localStorage.setItem('userInfo', JSON.stringify(value));
    }
  },
  actions: {

  }
});
