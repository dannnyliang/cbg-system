<template>
  <h1>Create Page</h1>
  <FormGame @submit="create" />
</template>

<script>
import FormGame from "../components/FormGame";
import createGame from "../apis/createGame";

export default {
  name: "Create",
  components: {
    FormGame,
  },
  methods: {
    async create(formValues) {
      await createGame(formValues);
    },
  },
};
</script>
