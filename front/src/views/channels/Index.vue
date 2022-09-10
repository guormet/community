<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <ktn-top></ktn-top>
        <ktn-list></ktn-list>
      </div>
      <div class="layui-col-md4">
        <ktn-sign></ktn-sign>
        <ktn-tips></ktn-tips>
        <ktn-hot-list></ktn-hot-list>
        <ktn-ads></ktn-ads>
        <ktn-links></ktn-links>
      </div>
    </div>
  </div>
</template>

<script>
  import Ads from '@/components/sideBar/Ads';
  import HotList from '@/components/sideBar/HotList';
  import Links from '@/components/sideBar/Links';
  import Sign from '@/components/sideBar/sign';
  import Tips from '@/components/sideBar/Tips';
  import List from '@/components/content/List';
  import Top from '@/components/content/Top';
  export default {
    name: 'IndexCnl',
    components: {
      'ktn-ads': Ads,
      'ktn-hot-list': HotList,
      'ktn-links': Links,
      'ktn-sign': Sign,
      'ktn-tips': Tips,
      'ktn-list': List,
      'ktn-top': Top
    }
  };
</script>

<style lang="scss" scoped>

</style>