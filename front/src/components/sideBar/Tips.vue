<template>
  <div>
    <div class="fly-panel">
      <h3 class="fly-panel-title">温馨通道</h3>
      <div class="fly-panel-main layui-row">
        <ul class="layui-clear ktn-quick">
          <li class="layui-col-xs6">
            <a href="/" target="_blank">gihub</a>
          </li>
          <li class="layui-col-xs6">
            <a href="/" target="_blank">gitLee</a>
          </li>
          <li class="layui-col-xs6">
            <a href="/" target="_blank">gitlab</a>
          </li>
          <li class="layui-col-xs6">
            <a href="/" target="_blank">gitMooc</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TipsCom'
  };
</script>

<style lang="scss" scoped>
$border-color: #f2f2f2;
.fly-panel-main {
  padding: 15px;
}
.ktn-quick {
  border: 1px solid $border-color;
  border-bottom: none;
  border-right: none;
  .layui-col-xs6 {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    border: 1px solid $border-color;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border-left: none;
    border-top: none;
    a {
      display: block;
    }
  }
}
</style>