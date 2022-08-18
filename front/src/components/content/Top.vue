<template>
  <div class="fly-panel" v-show="list.length">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a href="#signin" class="layui-hide-sm layui-show-xs-block fly-right" id="LAY_goSignin" style="color: #FF5722;">去签到</a>
    </div>    
    <ktn-list-item :list="list" @next-page="nextPage" :is-show="false"></ktn-list-item>
  </div>
</template>

<script>
import listMixin from './ListMixin';
import ListItem from './ListItem';
  export default {
    name: 'TopCom',
    mixins: [ listMixin ],
    components: {
      'ktn-list-item': ListItem
    },
    data () {
      return {
        isTop: 1,
        isRepeat: false,
        isEnd: false,
        list: [],
        page: 0,
        limit: 20
      };
    },
    mounted () {
      this._getList();
    },
    methods: {
      nextPage () {
        this.page++;
        this._getList();
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>