<template>
  <div class="modal" v-show="isShow">
    <div class="mask" @click="close()"></div>
    <div class="layui-layer layui-layer-page" :class="{'active': isShow}">
      <div class="layui-layer-title">
        签到活跃榜-TOP
        <i class="layui-icon layui-icon-close pull-right" @click="close()"></i>
      </div>
      <div class="layui-layer-content pd0">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li :class="{'layui-this': current === 0}" @click="choose(0)">最新签到</li>
            <li :class="{'layui-this': current === 1}" @click="choose(1)">今日最快</li>
            <li :class="{'layui-this': current === 2}" @click="choose(2)">总签到榜</li>
          </ul>
          <div class="layui-tab-content">
            <ul class="layui-tab-item layui-show">
              <li v-for="(item, index) in list" :key="`sign${index}`">
                <img :src="item.avatar" alt="" class="mr1">
                <cite class="fly-link">{{item.name}}</cite>
                <span class="fly-grey" v-if="current !== 2">
                  签到于{{item.created}}
                </span>
                <span class="fly-grey" v-else>
                  已经连续签到<i class="orange">{{item.count}}</i>天
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import { sign } from '@/api/user';
  export default {
    name: 'SignListCom',
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        current: 0,
        list: [
          {avatar: '/avatar/0.jpg', name: 'test1', count: 5, created: '2020-08-29'},
          {avatar: '/avatar/1.jpg', name: 'test2', count: 4, created: '2020-08-29'},
          {avatar: '/avatar/2.jpg', name: 'test3', count: 3, created: '2020-08-29'},
          {avatar: '/avatar/3.jpg', name: 'test4', count: 2, created: '2020-08-29'}
        ]
      };
    },
    methods: {
      close () {
        this.$emit('close-modal');
      },
      choose (val) {
        this.current = val;
        // 请求数据
        // sign().then((res) => {
        //   console.log(res);
        // });
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>