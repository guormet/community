<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <li class="layui-nav-item" v-for="(item, index) in list" :key="`center${index}`">
        <router-link :to="{name: item.link, params: {'uid': userInfo._id}}" :active-class="item.activeClass">
          <i class="layui-icon " :class="item.icon"></i>{{item.name}}
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'centerPage',
    data () {
      return {
        list:[
          {
            name: '我的主页',
            icon: 'layui-icon-home',
            link: 'home'
          },
          {
            name: '用户中心',
            icon: 'layui-icon-friends',
            link: 'center'
          },
          {
            name: '基本设置',
            icon: 'layui-icon-set',
            link: 'info',
            activeClass: 'layui-this'
          },
          {
            name: '我的帖子',
            icon: 'layui-icon-form',
            link: 'myPost',
            activeClass: 'layui-this'
          },
          {
            name: '我的消息',
            icon: 'layui-icon-reply-fill',
            link: 'msg'
          },
          {
            name: '其他设置',
            icon: 'layui-icon-component',
            link: 'others'
          }
        ]
      };
    },
    computed: {
      userInfo () {
        return this.$store.state.userInfo;
      }
    }
  };
</script>

<style lang="scss" scoped>
.layui-icon {
  margin-right: 10px;
}
</style>