<template>
  <div>
    <div class="fly-panel fly-column">
      <div class="layui-container">
        <ul class="layui-clear">
          <router-link tag="li" to="/" class="layui-hide-xs">
            <a href>
              首页
            </a>
          </router-link>
          <router-link v-for="(item, index) in list" :key="'panel' + index" tag="li" :to="item.path">
            <a href>
              {{item.name}}
              <span class="layui-badge-dot" v-if="item.isNew"></span>
            </a>
          </router-link>         
          <!-- 用户登入后显示 -->
          <template v-if="isLogin">
            <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
              <router-link :to="{name: 'myPost'}">我发表的贴</router-link>
            </li>
            <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
              <router-link :to="{name: 'myCollection'}">我收藏的贴</router-link>
            </li>
          </template>
        </ul>
        <div class="fly-column-right layui-hide-xs">
          <span class="fly-search"><i class="layui-icon"></i></span>
          <router-link class="layui-btn" to="/add"> 发表新帖</router-link>
        </div>
        <div class="layui-hide-sm layui-show-xs-block" style="margin-top: -10px; padding-bottom: 10px; text-align: center;">
          <router-link class="layui-btn" to="/add"> 发表新帖</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PanelCom',
    data () {
      return {
        list: [
          {
            name: '提问',
            path: '/index/ask',
            isNew: false
          },
          {
            name: '分享',
            path: '/index/share',
            isNew: false
          },
          {
            name: '讨论',
            path: '/index/discuss',
            isNew: true
          },
          {
            name: '建议',
            path: '/index/advise',
            isNew: false
          },
          {
            name: '公告',
            path: '/index/notice',
            isNew: false
          },
          {
            name: '动态',
            path: '/index/logs',
            isNew: false
          }
        ],
        isLogin: this.$store.state.isLogin
      };
    }
  };
</script>

<style lang="scss" scoped>

</style>