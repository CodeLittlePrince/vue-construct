<template>
  <div class="home">
    <div v-directive-sample:arg="'msg'">
      {{ `This is home` | filterSample('and text has been') }}
    </div>
    <div class="banner">banner</div>
    <div class="block"></div>
  </div>
</template>

<script>
  import mixinsSample from 'mixins/sample.js'

  export default {
    mixins: [mixinsSample]
  }
</script>

<style lang="scss">
  @import './style.scss';

  .block {
    width: 200px;
    height: 200px;
    background: rgb(21, 204, 189);
  }
</style>
