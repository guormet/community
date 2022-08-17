<template>
  <div class="fly-panel">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a href="#signin" class="layui-hide-sm layui-show-xs-block fly-right" id="LAY_goSignin" style="color: #FF5722;">去签到</a>
    </div>    
    <ktn-list-item></ktn-list-item>
  </div>
</template>

<script>
import ListItem from './ListItem';
  export default {
    name: 'TopCom',
    components: {
      'ktn-list-item': ListItem
    }
  };
</script>

<style lang="scss" scoped>

</style>