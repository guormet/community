<template>
  <div class="panel main pd20">
    <div class="msg">嗨, 欢迎您来到 KTN GO 的大家庭!</div>
    <div class="layui-row layui-col-space20">
      <div class="layui-col-md6">
        <div class="panel border">
          <div class="title">会员信息</div>
          <div class="content fly-signin">
            <p>积分经验值：
              <cite>60</cite> 
            </p>
            <p>您当前为： 
              <cite>VIP0</cite>
            </p>
          </div>
        </div>
      </div>
      <div class="layui-col-md6">
        <sign class="border"></sign>
      </div>
      <div class="layui-col-md12">
        <div class="panel border">
          <div class="title">快捷方式</div>
          <div class="content" style="height:auto;">
            <ul class="layui-row layui-col-space10">
              <li class="layui-col-sm3 layui-col-xs4" v-for="(item, index) in list" :key="`center${index}`">
                <router-link v-if="item.link" :to="{name: item.link, params: item.link === 'catalog' && item.params ? {catalog: item.params }: '' }">
                  <div class="layui-icon shortcut" :class="item.icon"></div>
                  <div>{{item.name}}</div>
                </router-link>
                <a v-else href @click.prevent="lostPage()">
                  <div class="layui-icon shortcut" :class="item.icon"></div>
                  <div>{{item.name}}</div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Sign from '@/components/sideBar/sign';
  export default {
    name: 'UserCenterCom',
    components: {
      Sign
    },
    data () {
      return {
        list: [
          {
            name: '修改信息',
            icon: 'layui-icon-set',
            link: 'info'
          },
          {
            name: '修改头像',
            icon: 'layui-icon-face-smile',
            link: 'picUpload'
          },
          {
            name: '修改密码',
            icon: 'layui-icon-password',
            link: 'password'
          },
          {
            name: '帐号绑定',
            icon: 'layui-icon-app',
            link: 'accounts'
          },
          {
            name: '发表新帖',
            icon: 'layui-icon-add-circle',
            link: 'add'
          },
          {
            name: '查看分享',
            icon: 'layui-icon-share',
            link: 'catalog',
            params: 'share'
          },
          {
            name: '我的帖子',
            icon: 'layui-icon-username',
            link: ''
          },
          {
            name: '我的收藏',
            icon: 'layui-icon-rate-solid',
            link: ''
          },
          {
            name: '其他资料',
            icon: 'layui-icon-template-1',
            link: ''
          },
          {
            name: '关注公众号',
            icon: 'layui-icon-login-wechat',
            link: ''
          },
          {
            name: '文档',
            icon: 'layui-icon-read',
            link: ''
          },
          {
            name: '后台管理',
            icon: 'layui-icon-user',
            link: ''
          }
        ]
      };
    },
    methods: {
      lostPage () {
        this.$alert('您访问的页面还在开发中！~~~');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @media screen and (max-width: 768px) {
    .panel {
      &.main {
        margin: 0 !important;
      }
    }
  }
  .panel {
    color: #333;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
    &.main {
      margin: 0 0 10px 215px;
    }
    li {
      text-align: center;
      padding: 10px;
    }
    
  }
  .msg {
    background: #f8f8f8;
    color: #666;
    padding: 10px 15px;
    margin-bottom: 20px;
  }
  .border {
    border: 1px solid #e6e6e6;
  }
  .title {
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    color: #333;
    border-bottom: 1px dotted #e9e9e9;
    font-size: 14px;
  }
  .content {
    padding: 18px 15px;
    height: 50px;
    line-height: 26px;
    font-size: 14px;
    color: #666;
    border-bottom: 1px dotted #e9e9e9;
    margin-bottom: 15px;
  }
  .shortcut {
    background: #2f9688;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    border-radius: 2px;
    font-size: 30px;
  }
</style>