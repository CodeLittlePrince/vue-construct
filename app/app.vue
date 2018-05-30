<template>
  <div>
    <c-nav></c-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import cNav from 'components/nav'

export default {
  components: {
    cNav
  }
}
</script>
