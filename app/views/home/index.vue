<template>
  <div class="home">
    <div v-directive-sample:arg="'msg'">
      {{ `This is home` | filterSample('and text has been') }}
    </div>
    <div class="banner"></div>
  </div>
</template>

<script>
  import mixinsSample from 'mixins/sample.js'

  export default {
    mixins: [mixinsSample]
  }
</script>

<style lang="scss">
  @import './style';
</style>