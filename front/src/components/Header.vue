<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <a
        class="fly-logo"
        href="/">
        <img
          src="../assets/logo-2.png"
          alt="layui"
          style="height:60px">
      </a>
      <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item layui-this">
          <a href="/">
            <i class="iconfont icon-jiaoliu" />交流
          </a>
        </li>
        <li class="layui-nav-item">
          <a href="/">
            <i class="iconfont icon-iconmingxinganli" />案例
          </a>
        </li>
        <li class="layui-nav-item">
          <a
            href="http://www.layui.com/"
            target="_blank">
            <i class="iconfont icon-ui" />采用框架
          </a>
        </li>
      </ul>

      <ul class="layui-nav fly-nav-user">
        <!-- 未登入的状态 -->
        <template v-if="!isShow">
          <li class="layui-nav-item">
            <a
              class="iconfont icon-touxiang layui-hide-xs"
              href="../user/login.html"/>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{name: 'login'}">登入</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{name: 'reg'}">注册</router-link>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href
              onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
              title="QQ登入"
              class="iconfont icon-qq"/>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href
              onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
              title="微博登入"
              class="iconfont icon-weibo"/>
          </li>
        </template>

        <!-- 登入后的状态 -->
        <template v-else>
          <li class="layui-nav-item" @mouseover="show()" @mouseleave="hide()">
            <a class="fly-nav-avatar" href="javascript:;">
              <cite class="layui-hide-xs">{{userInfo.name}}</cite>
              <!-- <i class="iconfont icon-renzheng layui-hide-xs" :title="`认证信息：${userInfo.name}`"></i> -->
              <i class="layui-badge fly-badge-vip layui-hide-xs" v-show="userInfo.isVip !== '0'">{{`VIP${userInfo.isVip}`}}</i>
              <img :src="userInfo.pic">
            </a>
            <dl class="layui-nav-child layui-anim layui-anim-upbit" :class="{'layui-show': isHover}">
              <dd>
                <router-link :to="{name: 'info'}">
                  <i class="layui-icon">&#xe620;</i>基本设置
                </router-link>
              </dd>
              <dd>
                <router-link :to="{name: 'msg'}">
                  <i class="iconfont icon-tongzhi" style="top: 4px;"></i>我的消息
                </router-link>
              </dd>
              <dd>
                <router-link :to="{name: 'info'}">
                  <i class="layui-icon" style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>我的主页
                </router-link>
              </dd>
              <hr style="margin: 5px 0;" />
              <dd>
                <a href="javascript: void(0)" style="text-align: center;" @click="logout()">退出</a>
              </dd>
            </dl>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderCom',
  data () {
    return {
      isHover: false,
      hoverCtl: {}
    };
  },
  computed: {
    isShow () {
      return this.$store.state.isLogin;
    },    
    userInfo () {
      return this.$store.state.userInfo || {
        name: '',
        pic: '',
        isVip: '0'
      };
    }
  },
  methods: {
    show () {
      clearTimeout(this.hoverCtl);
      this.hoverCtl = setTimeout(() => {
        this.isHover = true;
      }, 200);
    },
    hide () {
      clearTimeout(this.hoverCtl);
      this.hoverCtl = setTimeout(() => {
        this.isHover = false;
      }, 500);
    },
    logout () {
      this.$confirm('确定退出吗？', () => {
        localStorage.clear();
        this.$store.commit('setToken', '');
        this.$store.commit('setUserInfo', {});
        this.$store.commit('setIsLogin', false);
        this.$router.push('/');
      }, () => {
        // do something
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.fly-logo {
  left: -15px;
  top: 0px;
  margin-left: 15px;
}
</style>
