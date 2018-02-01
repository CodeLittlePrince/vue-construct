<template>
  <div class="home">
    <div class="content jello">
      <h1 v-directive-sample:arg="'msg'">
        {{ `Vue` | filterSample('前端架构') }}
        <span>- by 咻</span>
      </h1>
      <a href="https://github.com/CodeLittlePrince/blog" target="__blank">
        <div class="cover"></div>
      </a>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import mixinsSample from 'mixins/sample'
  import homeApi from 'api/home'

  export default {
    mixins: [mixinsSample],
    mounted() {
      axios.get(homeApi.hello)
        .then(res => {
          const data = res.data
          console.log(`%c${data.msg}`, 'color: blue')
        })
        .catch(() => {
          console.warn('%c少年，是不是忘了npm run mock?', 'color: cadetblue')
        })
    }
  }
</script>

<style lang="scss">
  @import './style.scss';
</style>
