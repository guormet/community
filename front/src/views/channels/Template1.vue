<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <ktn-list></ktn-list>
      </div>
      <div class="layui-col-md4">
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
  import List from '@/components/content/List';
  export default {
    name: 'Template1Cnl',
    components: {
      'ktn-ads': Ads,
      'ktn-hot-list': HotList,
      'ktn-links': Links,
      'ktn-list': List
    }
  };
</script>

<style lang="scss" scoped>

</style>