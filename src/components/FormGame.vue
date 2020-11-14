<template>
  <form>
    <p>
      <label for="name">Name: </label>
      <input type="text" name="name" id="name" v-model="form.name" />
    </p>

    <p>
      <label for="minPlayers">minPlayers: </label>
      <input
        type="number"
        name="minPlayers"
        id="minPlayers"
        v-model="form.minPlayers"
        min="0"
      />
    </p>

    <p>
      <label for="maxPlayers">maxPlayers: </label>
      <input
        type="number"
        name="maxPlayers"
        id="maxPlayers"
        v-model="form.maxPlayers"
        min="0"
      />
    </p>

    <p>
      <label for="type">Game type: </label>
      <select name="type" id="type" v-model="form.type">
        <option v-for="(label, key) in $GAME_TYPE" :key="key" :value="key">
          {{ label }}
        </option>
      </select>
    </p>

    <button @click.prevent="$emit('submit', payloadTransformer($data.form))">submit</button>
  </form>
</template>

<script>
export default {
  name: "FormGame",
  props: ["initialValues", "submit"],
  data() {
    return {
      form: {},
    };
  },
  mounted() {
    this.initForm(this.initialValues);
  },
  watch: {
    initialValues() {
      this.initForm(this.initialValues);
    },
  },
  methods: {
    initForm(initialValues) {
      this.$data.form = {
        name: initialValues?.name,
        minPlayers: initialValues?.minPlayers ?? 1,
        maxPlayers: initialValues?.maxPlayers ?? 1,
        type: initialValues?.type,
      };
    },
    payloadTransformer(formValues) {
      return {
        ...formValues,
        minPlayers: Number(formValues.minPlayers),
        maxPlayers: Number(formValues.maxPlayers),
      };
    },
  },
};
</script>