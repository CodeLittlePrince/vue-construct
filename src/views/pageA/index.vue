<template>
  <div class="pageA">
    <div class="content jello">
      <h1>
        Vue页面-A &nbsp;
        <span>- by 咻</span>
      </h1>
      <div class="cover"></div>
    </div>
  </div>
</template>

<style lang="scss">
@import '~common/scss/variable';
@import '~common/scss/mixin';

.pageA {
  .content {
    position: relative;
    width: 1200px;
    height: 400px;
    margin: 0 auto;
    animation-duration: 1s;
    h1 {
      position: absolute;
      bottom: 30px;
      left: 120px;
      font-size: $font-size-amazing;
      text-align: center;
      margin-top: 50px;
      color: $color-text-gray;
      font-weight: bolder;
      span {
        font-size: $font-size-xl;
      }
    }
    .cover {
      position: absolute;
      z-index: 2;
      right: 62px;
      bottom: 90px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      @include bg-image('~common/img/home');
      background-size: contain;
    }
  }
}
</style>
