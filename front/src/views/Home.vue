<template>
  <div>
    <ktn-panel></ktn-panel>
    <router-view></router-view>
  </div>
</template>

<script>
import funPanel from '@/components/Panel';
  export default {
    name: 'HomePage',
    components: {
      'ktn-panel': funPanel
    }
  };
</script>

<style lang="scss" scoped>
  
</style>