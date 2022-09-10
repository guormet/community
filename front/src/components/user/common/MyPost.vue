<template>
  <div>
    <table class="layui-table" border="0">
      <thead>
        <tr>
          <td class="layui-cell"><span>帖子标题</span></td>
          <td class="layui-cell"><span>状态</span></td>
          <td class="layui-cell"><span>结贴</span></td>
          <td class="layui-cell"><span>发表时间</span></td>
          <td class="layui-cell"><span>数据</span></td>
          <td class="layui-cell"><span>操作</span></td>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center">
          <td class="text-left">文章测试标题111</td>
          <td>打开</td>
          <td>未结</td>
          <td>2022-11-10</td>
          <td>10阅/4答</td>
          <td>
            <div class="layui-btn layui-btn-xs">编辑</div>
            <div class="layui-btn layui-btn-xs layui-btn-danger">删除</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'UserMyPostCom'
  };
</script>

<style lang="scss" scoped>

</style>