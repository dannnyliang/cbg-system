<template>
  <div class="logo" />
  <HelloWorld msg="Welcome to 致理桌遊社" />
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>

<style>
.logo {
  width: 200px;
  height: 200px;
  background-size: contain;
  background-image: url("../assets/logo.jpg");
  border-radius: 20px;
  margin: 16px auto;
}
</style>