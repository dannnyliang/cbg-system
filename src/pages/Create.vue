<template>
  <h1>Create Page</h1>
  <FormGame @submit="create" />
</template>

<script>
import FormGame from "../components/FormGame";
import createGame from "../apis/createGame";
import { router } from "../main";

export default {
  name: "Create",
  components: {
    FormGame,
  },
  methods: {
    async create(formValues) {
      await createGame(formValues);
      router.replace("/list");
    },
  },
};
</script>
