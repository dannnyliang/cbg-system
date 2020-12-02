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

    <label for="coverImage">Cover Image: </label>
    <p v-if="$props?.initialValues?.coverImage">
      <img :src="$props?.initialValues?.coverImage" width="100" height="100" />
    </p>
    <p v-else>
      <a-upload
        name="coverImage"
        id="coverImage"
        accept="image/*"
        list-type="picture-card"
        :action="uploadUrl"
        :multiple="true"
        :remove="handleCoverRemove"
        @change="handleCoverChange"
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
import { getUploadFileEndpoint } from "../apis/utils";

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
      return getUploadFileEndpoint("coverImages");
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
    console.log(this.$props);
    this.initForm(this.initialValues);
  },
  watch: {
    initialValues() {
      this.initForm(this.initialValues);
    },
  },
  methods: {
    initForm(initialValues) {
      if (initialValues?.coverImage) {
        this.$data.defaultCoverImage = [{ url: initialValues?.coverImage }];
      }
      this.$data.form = {
        name: initialValues?.name,
        minPlayers: initialValues?.minPlayers ?? 1,
        maxPlayers: initialValues?.maxPlayers ?? 1,
        type: initialValues?.type,
        coverImage: initialValues?.coverImage,
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
    handleCoverChange(event) {
      const { file } = event;
      if (file.status === "done") {
        this.$data.form.coverImage = file.response.url;
      }
    },
    async handlePreview(file) {
      if (!file?.response?.url) {
        return;
      }
      this.previewImage = file.response.url;
      this.previewVisible = true;
    },
    handleCoverRemove(event) {
      this.$data.form.coverImage = null;
      return removeFile(event.response.filePath);
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