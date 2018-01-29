<template>
  <div class="home">
    <div v-directive-sample:arg="'msg'">
      {{ `This is home` | filterSample('and text has been') }}
    </div>
    <div class="banner">banner</div>
  </div>
</template>

<script>
  import './style'
  import mixinsSample from 'mixins/sample.js'

  export default {
    mixins: [mixinsSample]
  }
</script>

<style lang="scss">
  .banner {
    width: 200px;
    height: 200px;
    background: rgb(21, 204, 189);
  }
</style>
