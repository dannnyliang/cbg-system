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
      <label for="coverImage">Cover Image: </label>
      <a-upload
        name="coverImage"
        id="coverImage"
        list-type="picture-list"
        :action="uploadUrl"
        :multiple="true"
        :remove="handleCoverRemove"
        @preview="handlePreview"
      >
        <a-button> Click to Upload </a-button>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img style="width: 100%" :src="previewImage" />
      </a-modal>
    </p>

    <p>
      <label for="type">Game type: </label>
      <select name="type" id="type" v-model="form.type">
        <option v-for="(label, key) in $GAME_TYPE" :key="key" :value="key">
          {{ label }}
        </option>
      </select>
    </p>

    <button @click.prevent="$emit('submit', payloadTransformer($data.form))">
      submit
    </button>
  </form>
</template>

<script>
import { Upload, Button, Modal } from "ant-design-vue";
import removeFile from "../apis/removeFile";
import { getEndpoint } from "../apis/utils";

export default {
  name: "FormGame",
  props: ["initialValues", "submit"],
  components: {
    AUpload: Upload,
    AButton: Button,
    AModal: Modal,
  },
  computed: {
    uploadUrl() {
      return getEndpoint("uploadFile");
    },
  },
  data() {
    return {
      previewVisible: false,
      previewImage: "",
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
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file?.response?.url) {
        return;
      }
      this.previewImage = file.response.url;
      this.previewVisible = true;
    },
    handleCoverRemove(event) {
      return removeFile(event.response.filePath)
    },
  },
};
</script>

<style>
.ant-upload-picture-card-wrapper {
  text-align: initial;
  display: flex;
  justify-content: center;
}
</style>