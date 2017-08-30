<template>
  <div id="app">
    <h2>{{msg}}</h2>
    <router-link to="/home">hom</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      msg: 'ddd',
    }
  },
}
</script>

<style lang="scss">
  #app {
    color: yellow;
  }
</style>
