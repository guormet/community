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

body {
  margin-top: unset !important;
  padding-top: 61px;
  box-sizing: border-box;
}

body,
html {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  height: 100%;
  overflow-y: auto;
}
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
  .pd#{$i} {padding: 10px * $i !important;}
  .mg#{$i} {margin: 10px * $i !important;}
  .pl#{$i} {padding-left: 10px * $i !important;}
  .pr#{$i} {padding-right: 10px * $i !important;}
  .pt#{$i} {padding-top: 10px * $i !important;}
  .pb#{$i} {padding-bottom: 10px * $i !important;}
  .ml#{$i} {margin-left: 10px * $i !important;}
  .mr#{$i} {margin-right: 10px * $i !important;}
  .mt#{$i} {margin-top: 10px * $i !important;}
  .mb#{$i} {margin-bottom: 10px * $i !important;}
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

.d-hide {
  position: absolute;
  overflow: hidden;
  height: 0;
}

.d-flex {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  &.flex-start {
    justify-content: flex-start;
  }
  &.flex-end {
    justify-content: flex-end;
  }
  &.flex-center {
    justify-content: center;
  }
}

.link {
  color: #01aaed;
}
.success {
  color: #5fb878;
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
