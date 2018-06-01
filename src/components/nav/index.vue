<template>
  <ul class="c-nav">
    <li class="rubberBand">
      <router-link to="/">首页</router-link>
    </li>
    <li class="rubberBand">
      <router-link to="/pageA">页面A</router-link>
    </li>
    <li class="rubberBand">
      <router-link to="/pageB">页面B</router-link>
    </li>
  </ul>
</template>

<style lang="scss">
  @import '~common/scss/variable';

  .c-nav {
    font-size: 0;
    text-align: center;
    li {
      font-size: $font-size-xl;
      display: inline-block;
      padding: 20px;
      animation-duration: 1.5s;
    }
  }
</style>
