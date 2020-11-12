<template>
  <h1 @click="log">List Page</h1>
  <div v-if="loading === true">Loading...</div>
  <div v-else-if="data.length === 0">No any game!</div>
  <div class="list" v-else>
    <router-link
      class="item-link"
      v-for="item in data"
      :key="item.id"
      :to="{ name: 'item', params: { id: item.id } }"
      >{{ item.name }}</router-link
    >
  </div>
</template>

<script>
import getGames from "../apis/getGames";

export default {
  name: "List",
  data() {
    return {
      loading: true,
      data: [],
    };
  },
  async mounted() {
    const data = await getGames();
    this.$data.data = data;
    this.$data.loading = false;
  },
};
</script>

<style>
.list {
  display: inline-flex;
  flex-flow: column nowrap;
}
.item-link {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
}
</style>