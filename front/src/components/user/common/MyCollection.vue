<template>
  <div>
    <table class="layui-table" border="0">
      <thead>
        <tr>
          <th class="title">
            <div class="layui-table-cell pl0">
              <span>帖子标题</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell text-right pr0">
              <span>收藏时间</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">收藏文章测试标题111</td>
          <td class=" text-right pr0">2022-11-10 00:00:00</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'UserMyCollection'
  };
</script>

<style lang="scss" scoped>
  .title {
    width: 70%;
  }
</style>