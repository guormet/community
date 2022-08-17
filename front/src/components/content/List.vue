<template>
  <div class="fly-panel" style="margin-bottom: 0;">
    <div class="fly-panel-title fly-filter">
      <a :class="{'layui-this' : status === '' && tag === ''}" @click.prevent="search()">综合</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this' : status === '0'}" @click.prevent="search(0)">未结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this' : status === '1'}" @click.prevent="search(1)">已结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this' : status === '' && tag === '精华'}" @click.prevent="search(2)">精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a :class="{'layui-this' : sort === 'created'}">按最新</a>
        <span class="fly-mid"></span>
        <a :class="{'layui-this' : sort === 'answer'}">按热议</a>
      </span>
    </div>
    <ktn-list-item></ktn-list-item>
  </div>
</template>

<script>
import ListItem from './ListItem';
  export default {
  name: 'ListCom',
  components: {
    'ktn-list-item': ListItem
  },
  data () { 
    return {
      status: '',
      tag: '',
      sort: ''
    };
  }
  };
</script>

<style lang="scss" scoped>

</style>