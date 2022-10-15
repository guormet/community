<template>
  <div id="app">
    <imooc-header />
    <router-view />
    <imooc-footer />
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
export default {
  name: 'AppMain',
  components: {
    'imooc-header': Header,
    'imooc-footer': Footer
  }
};
</script>

<style lang="scss">
@import "assets/css/global.css";
@import "assets/css/layui-layer/layer.css";
// 公用样式
.svg {
  position: relative;
  display: inline-block;
  height: 50px;
  top: -10px;
}
.gray {
  color: #999;
}
.orange {
  color: #ff5722;
}
.pull-right {
  float: right !important;
}
@for $i from 0 through 5 {
  .pd#{$i * 10} {padding: 10px * $i !important;}
  .mg#{$i * 10} {margin: 10px * $i !important;}
  .pl#{$i * 10} {padding-left: 10px * $i !important;}
  .pr#{$i * 10} {padding-right: 10px * $i !important;}
  .pt#{$i * 10} {padding-top: 10px * $i !important;}
  .pb#{$i * 10} {padding-bottom: 10px * $i !important;}
  .ml#{$i * 10} {margin-left: 10px * $i !important;}
  .mr#{$i * 10} {margin-right: 10px * $i !important;}
  .mt#{$i * 10} {margin-top: 10px * $i !important;}
  .mb#{$i * 10} {margin-bottom: 10px * $i !important;}
}
.mt-20 {
  margin-top: -20px;
}
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes bounceOut {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(0.7);
  }
}

.fade-leave-active {
  animation: bounceOut 0.3s;
}

.fade-enter-active,
.fade-enter-to {
  animation: bounceIn 0.3s;
}
</style>
