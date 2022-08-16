import Vue from 'vue';
import axios from 'axios';
import xss from 'xss';
import App from './App.vue';
import router from './router';
import store from './store';

import Alert from './components/modules/alert';

import '@/utils/veevalidate';
Vue.prototype.xss = xss;
Vue.use( Alert );

Vue.config.productionTip = false;

axios.defaults.baseURL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000'
    : 'http://your.domain.com';

new Vue( {
  router,
  store,
  render: ( h ) => h( App )
} ).$mount( '#app' );
