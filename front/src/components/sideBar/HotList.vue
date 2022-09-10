<template>
  <div>
    <dl class="fly-panel fly-list-one">
      <dt class="fly-panel-title">本周热议</dt>
      <dd v-for="(item, index) in list" :key="`topWeek${index}`">
        <a :href="item.link">{{item.title}}</a>
        <span><i class="iconfont icon-pinglun1"></i> {{item.answer}}</span>
      </dd>
      <!-- 无数据时 -->
      
      <div class="fly-none" v-if="list.length === 0">没有相关数据</div>
     
    </dl>
  </div>
</template>

<script>
  import { getTopWeek } from '@/api/content';
  export default {
    name: 'HotListCom',
    data () {
      return {
        list: []        
      };
    },
    mounted () {
      this._getTopWeek();
    },
    methods: {
      _getTopWeek () {
        getTopWeek().then((res) => {
          this.list = res.data;
        });
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>