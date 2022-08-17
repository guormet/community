import AlertComponent from './Alert.vue';

const Alert = {};

Alert.install = function ( Vue ) {
  const AlertConstructor = Vue.extend( AlertComponent );
  const instance = new AlertConstructor();
  instance.$mount( document.createElement( 'div' ) );
  document.body.appendChild( instance.$el );
  
  // 添加实例方法 alert
  Vue.prototype.$alert = ( msg ) => {
    // 逻辑...
    instance.alertType = 'alert';
    instance.msg = msg;
    instance.isShow = true;
    instance.close = () => {
      instance.isShow = false;
    };
  };
  // 添加实例方法 confirm
  Vue.prototype.$confirm = ( msg, success, cancel ) => {
    // 逻辑...
    instance.alertType = 'confirm';
    instance.msg = msg;
    instance.isShow = true;
    instance.close = () => {
      instance.isShow = false;
    };
    if ( typeof success !== 'undefined' ) {
      instance.success = success;
    }
    if ( typeof cancel !== 'undefined' ) {
      instance.cancel = cancel;
    }
  };
};

export default Alert;