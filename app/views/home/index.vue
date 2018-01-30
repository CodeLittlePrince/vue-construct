<template>
  <div class="home">
    <div class="content">
      <h1 v-directive-sample:arg="'msg'">
        {{ `Vue` | filterSample('前端架构') }}
        <span>- by 咻</span>
      </h1>
      <div class="cover jello"></div>
    </div>
  </div>
</template>

<script>
  import mixinsSample from 'mixins/sample'

  export default {
    mixins: [mixinsSample]
  }
</script>

<style lang="scss">
  @import './style.scss';
</style>
