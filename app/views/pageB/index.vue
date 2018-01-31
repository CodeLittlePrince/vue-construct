<template>
  <div class="pageB">
    <div class="content jello">
      <h1>
        Vue页面-B &nbsp;
        <span>- by 咻</span>
      </h1>
      <div class="cover"></div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import mixinsSample from 'mixins/sample'

  export default {
    mixins: [mixinsSample],
    mounted() {
      axios.get('/api/home/hello')
        .then(res => {
          const data = res.data
          console.log(`%c${data.msg}`, 'color: blue')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<style lang="scss">
  @import './style.scss';
</style>
