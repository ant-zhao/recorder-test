<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
    name: 'App',
    components: {
        
    },
    mounted() {
        
    },
}
</script>

<style lang="less" scoped>
.container {
    width: 1400px;
    margin: 0 auto;
    height: 100vh;
    min-height: 600px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
