<template>
  <div class="layui-container flex">
    <img src="../assets/img/404.svg" width="500px" alt="">
    <p>找不到页面了</p>
    <router-link to="/" class="layui-btn">回到首页</router-link>
  </div>
</template>

<script>
  export default {
    name: 'NotFound'
  };
</script>

<style lang="scss" scoped>
  .flex {
    width: 100%;
    min-height: 400px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }
  p {
    padding: 10px 0 15px 0;
    color: #ddd;
  }
</style>