<template>
  <h1>Item Page</h1>
  <p>Item id: {{ $route.params.id }}</p>
  <FormGame :initialValues="data" @submit="update" />
  <router-link to="/list">
    <div class="back">Back to list</div>
  </router-link>
</template>

<script>
import FormGame from "../components/FormGame";
import updateGame from '../apis/updateGame'
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
  },
};
</script>

<style>
a {
  text-decoration: none;
}
.back {
  color: #42b983;
  font-weight: bold;
  font-size: 20px;
  margin-top: 16px;
}
</style>