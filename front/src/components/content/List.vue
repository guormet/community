<template>
  <div class="fly-panel list" style="margin-bottom: 0;">
    <div class="fly-panel-title fly-filter">
      <a :class="{'layui-this' : status === '' && tag === ''}" @click.prevent="search()">综合</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this' : status === 0}" @click.prevent="search(0)">未结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this' : status === 1}" @click.prevent="search(1)">已结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this' : status === '' && tag === '精华'}" @click.prevent="search(2)">精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a :class="{'layui-this' : sort === 'created'}" @click.prevent="search(3)">按最新</a>
        <span class="fly-mid"></span>
        <a :class="{'layui-this' : sort === 'answer'}" @click.prevent="search(4)">按热议</a>
      </span>
    </div>
    <ktn-list-item :list="list" @next-page="nextPage" :is-end="isEnd"></ktn-list-item>
  </div>
</template>

<script>
import listMixin from './ListMixin';
import ListItem from './ListItem';
  export default {
  name: 'ListCom',
  mixins: [ listMixin ],
  components: {
    'ktn-list-item': ListItem
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    current (newVal, oldVal) {
      this.init();
    },
    // eslint-disable-next-line no-unused-vars
    $route (newVal, oldVal) {
      let catalog = newVal.params['catalog'];
      if (typeof catalog !== 'undefined' && catalog !== '') {
        this.catalog = catalog;
      }
      this.init();
    }
  },
  data () { 
    return {
      isTop: 0,
      isRepeat: false,
      isEnd: false,
      current: '',
      status: '', // 0 未结 1 已结
      tag: '',
      sort: 'created',
      page: 0,
      limit: 20,
      catalog: '',
      list: []
    };
  },
  mounted () {
    this._getList();
  },
  methods: {
    init () {
      this.page = 0;
      this.list = [];
      this.isEnd = false;
      this._getList();
    },
    nextPage () {
      this.page++;
      this._getList();
    },
    search (val) {
      if (typeof val === 'undefined' && this.current === '') {
        return;
      }
      this.current = val;
      switch (val) {
        // 未结帖
        case 0:
          this.status = 0;
          this.tag = '';
          break;
        // 已结帖
        case 1:
          this.status = 1;
          this.tag = '';
          break;
        // 查询精华
        case 2:
          this.status = '';
          this.tag = '精华';
          break;
        case 3:
          this.sort = 'created';
          break;
        case 4:
          this.sort = 'answer';
          break;
        default:
          this.status = '';
          this.tag = '';
          this.current = '';
          break;
      }
    }
  }
  };
</script>

<style lang="scss" scoped>
  .list {
    a {
      cursor: pointer;
    }
  }
</style>