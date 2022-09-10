<template>
  <div>
    <div class="fly-panel fly-link">
      <h3 class="fly-panel-title">友情链接</h3>
      <dl class="fly-panel-main">
        <dd v-for="(item, index) in list" :key="`links${index}`">
          <a :href="item.link" target="_blank">{{item.title}}</a></dd>
        <dd><a @click.prevent="applyLink" class="fly-link">申请友链</a></dd>
      </dl>
    </div>
  </div>
</template>

<script>
  import {getLinks} from '@/api/content';
  export default {
    name: 'LinksCom',
    data () {
      return {
        list: []
      };
    },
    mounted () {
      this._getLinks();
    },
    methods: {
      _getLinks () {
        getLinks().then((res) => {
          this.list = res.data;
        });
      },
      applyLink () {
        // do something...
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>