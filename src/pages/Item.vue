<template>
  <h1>Item Page</h1>
  <p>Item id: {{ $route.params.id }}</p>
  <FormGame :initialValues="data" @submit="update" />

  <div class="button-row">
    <router-link to="/list">
      <div class="text-button">Back to list</div>
    </router-link>
    <div class="text-button danger" @click.prevent="remove">Remove</div>
  </div>
</template>

<script>
import FormGame from "../components/FormGame";
import updateGame from "../apis/updateGame";
import removeGame from "../apis/removeGame";
import getGame from "../apis/getGame";

export default {
  name: "Item",
  components: {
    FormGame,
  },
  data() {
    return {
      loading: true,
      data: {},
    };
  },
  async created() {
    const data = await getGame(this.$route.params.id);
    this.$data.data = data;
    this.$data.loading = false;
  },
  methods: {
    async update(formValues) {
      await updateGame(this.$route.params.id, formValues);
    },
    async remove() {
      await removeGame(this.$route.params.id);
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}
.button-row {
  display: flex;
  justify-content: center;
}
.button-row > * {
  margin: 16px;
}
.text-button {
  color: #42b983;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
}
.danger {
  color: red;
}
</style>