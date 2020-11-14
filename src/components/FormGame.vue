<template>
  <form>
    <p>
      <label for="name">Name: </label>
      <input type="text" name="name" id="name" v-model="form.name" />
    </p>

    <p>
      <label for="minPlayer">minPlayer: </label>
      <input
        type="number"
        name="minPlayer"
        id="minPlayer"
        v-model="form.minPlayer"
        min="0"
      />
    </p>

    <p>
      <label for="maxPlayer">maxPlayer: </label>
      <input
        type="number"
        name="maxPlayer"
        id="maxPlayer"
        v-model="form.maxPlayer"
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
        minPlayer: initialValues?.minPlayer ?? 1,
        maxPlayer: initialValues?.maxPlayer ?? 1,
        type: initialValues?.type,
      };
    },
    payloadTransformer(formValues) {
      return {
        ...formValues,
        minPlayer: Number(formValues.minPlayer),
        maxPlayer: Number(formValues.maxPlayer),
      };
    },
  },
};
</script>