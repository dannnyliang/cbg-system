<template>
  <h1>Item Page</h1>
  <p>Item id: {{ $route.params.id }}</p>
  <router-link class="back" to="/list">Back to list</router-link>
</template>

<script>
export default {
  name: "Item",
};
</script>

<style>
.back {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
}
</style>