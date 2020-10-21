<template>
  <div class='logo' />
  <HelloWorld msg="Welcome to 致理桌遊社"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  width: 200px;
  height: 200px;
  background-size: contain;
  background-image: url('./assets/logo.jpg');
  border-radius: 20px;
  margin: 0 auto;
}
</style>
