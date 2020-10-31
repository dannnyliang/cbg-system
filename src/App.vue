<template>
  <div class="links">
    <router-link to="/">Home</router-link>
    <router-link to="/list">List</router-link>
    <router-link to="/create">Create</router-link>
  </div>

  <router-view> </router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}

.links a {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
  margin-right: 8px;
}
.links a:last-child {
  margin-right: 0;
}
.links a:hover {
  text-decoration: underline;
}
</style>
