<template>
  <div>
    <ul class="fly-list">
      <li v-for="(item, index) in items" :key="`listItem${index}`">
        <router-link class="fly-avatar" :to="{name: 'home', params: {uid: item.uid._id}}" link>
          <img :src="item.uid.pic" :alt="item.uid.name">
        </router-link>
        <h2>
          <a class="layui-badge">{{item.catalogStr}}</a>
          <router-link :to="{name: 'detail', params: {tid: item._id}}">{{item.title}}</router-link>
        </h2>
        <div class="fly-list-info">
          <router-link :to="{name: 'home', params: {uid: item.uid._id}}" link>
            <cite>{{item.uid.name}}</cite>
            <!--<i class="iconfont icon-renzheng" title="认证信息：XXX"></i>-->
            <i class="layui-badge fly-badge-vip" v-if="item.uid.isVip !== '0'">{{`VIP${item.uid.isVip}`}}</i>
          </router-link>
          <span>{{item.created | moment }}</span>

          <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> {{item.fav}}</span>
          <span class="layui-badge fly-badge-accept layui-hide-xs" v-show="item.isEnd !== '0'">已结</span>
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1" title="回答"></i> {{item.answer}}
          </span>
        </div>
        <div class="fly-list-badge" v-show="item.tags.length > 0 && item.tags[0].name !== ''">
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
  // import moment from 'dayjs';
  // import relativeTime from 'dayjs/plugin/relativeTime';
  // import 'dayjs/locale/zh-cn';
  // import _ from 'lodash';

  // moment.extend(relativeTime);
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
        this.list.map((item) => {
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
    }
    // filters: {
    //   moment (date) {
    //     // 超过7天，显示日期
    //     if (moment(date).isBefore(moment().subtract(7, 'days'))) {
    //       return moment(date).format('YYYY-MM-DD');
    //     } else {
    //       // xx小时前，X天前
    //       return moment(date).locale('zh-cn').from(moment());
    //     }
    //   }
    // }

  };
</script>

<style lang="scss" scoped>
  .nomore {
    font-size: 16px;
    padding: 30px 0;
  }
</style>