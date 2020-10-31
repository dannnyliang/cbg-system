<template>
  <h1>List Page</h1>
  <div class="list">
    <router-link
      class="item-link"
      v-for="item in items"
      :key="item.id"
      :to="{ name: 'item', params: { id: item.id } }"
      >{{ item.id }}</router-link
    >
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      items: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };
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