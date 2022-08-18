<template>
  <div>
    <ul class="fly-list">
      <li v-for="(item, index) in items" :key="`listItem${index}`">
        <a href="user/home.html" class="fly-avatar">
          <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt="贤心">
        </a>
        <h2>
          <a class="layui-badge">{{item.catalogStr}}</a>
          <a href="jie/detail.html">{{item.title}}</a>
        </h2>
        <div class="fly-list-info">
          <a href="user/home.html" link>
            <cite>{{item.uid.name}}</cite>
            <!--<i class="iconfont icon-renzheng" title="认证信息：XXX"></i>-->
            <i class="layui-badge fly-badge-vip" v-if="item.uid.isVip !== '0'">{{`VIP${item.uid.isVip}`}}</i>
          </a>
          <span>{{item.created | moment }}</span>

          <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> {{item.fav}}</span>
          <span class="layui-badge fly-badge-accept layui-hide-xs" v-show="item.status !== 0">已结</span>
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1" title="回答"></i> {{item.answer}}
          </span>
        </div>
        <div class="fly-list-badge" v-show="item.tags.length">
          <span class="layui-badge" v-for="(tag, index) in item.tags" :key="`tag${index}`" :class="tag.class">{{tag.name}}</span>
        </div>
      </li>
    </ul>
    <div style="text-align: center" v-show="isShow">
      <div class="nomore gray" v-if="isEnd">
        没有更多了
      </div>
      <div class="laypage-main" v-else>
        <a @click.prevent="more" class="laypage-next">更多求解</a>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import 'moment/locale/zh-cn';
  import _ from 'lodash';
  export default {
    name: 'ListItemCom',
    props: {
      list: { // 列表内容
        type: Array,
        default: () => []
      },
      isShow: { // 是否显示加载更多（区分置顶、文章列表）
        type: Boolean,
        default: true
      },
      isEnd: { // 是否显示加载更多（区分列表是否加载完毕）
        type: Boolean,
        default: true
      }
    },
    computed: {
      items () {  // 关联list，监听list内容变化
        _.map((this.list), (item) => {
          switch (item.catalog) {
            case 'ask':
              item.catalogStr = '提问';
              break;
            case 'advise':
              item.catalogStr = '建议';
              break;
            case 'discuss':
              item.catalogStr = '交流';
              break;
            case 'share':
              item.catalogStr = '分享';
              break;
            case 'news':
              item.catalogStr = '动态';
              break;
            default:
              break;
          }
        });
        return this.list;
      }
    },
    methods: {
      more () {
        this.$emit('next-page');
      }
    },
    filters: {
      moment (date) {
        moment.suppressDeprecationWarnings = true;
        // 超过7天，显示日期
        if (moment(date).isBefore(moment().subtract(7, 'days'))) {
          return moment(date).format('YYYY-MM-DD');
        } else {
          // xx小时前，X天前
          return moment(date).from(moment());
        }
      }
    }

  };
</script>

<style lang="scss" scoped>
  .nomore {
    font-size: 16px;
    padding: 30px 0;
  }
</style>