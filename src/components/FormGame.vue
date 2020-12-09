<template>
  <a-form :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="名稱（中文）">
      <a-input v-model:value="form.name" />
    </a-form-item>

    <a-form-item label="最少人數">
      <a-input-number v-model:value="form.minPlayers" :min="1" />
    </a-form-item>

    <a-form-item label="最多人數">
      <a-input-number v-model:value="form.maxPlayers" :min="1" />
    </a-form-item>

    <a-form-item label="封面">
      <a-upload
        accept="image/*"
        list-type="picture-card"
        v-model:fileList="form.coverImage"
        :multiple="true"
        :action="uploadUrl"
        @change="handleCoverChange"
        @preview="handlePreview($event?.response?.url)"
      >
        <div v-if="showCoverImageUploadButton">
          <loading-outlined v-if="loading" />
          <div v-else>
            <plus-outlined />
            <div>上傳</div>
          </div>
        </div>
      </a-upload>
    </a-form-item>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img style="width: 100%" :src="previewImage" />
    </a-modal>

    <a-form-item label="類別">
      <a-select v-model:value="form.type">
        <a-select-option
          v-for="(label, key) in $GAME_TYPE"
          :key="key"
          :value="key"
        >
          {{ label }}
        </a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 4 }">
      <a-button
        type="primary"
        @click="$emit('submit', payloadTransformer($data.form))"
      >
        Create
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import {
  Upload,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
} from "ant-design-vue";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { getUploadFileEndpoint } from "../apis/utils";
import { getFileListFromFileInfo } from "../utils";

export default {
  name: "FormGame",
  props: ["initialValues", "submit"],
  components: {
    AUpload: Upload,
    AButton: Button,
    AModal: Modal,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AInputNumber: InputNumber,
    ASelect: Select,
    ASelectOption: Select.Option,
    LoadingOutlined,
    PlusOutlined,
  },
  computed: {
    uploadUrl() {
      return getUploadFileEndpoint("coverImages");
    },
    showCoverImageUploadButton() {
      return this.$data.form.coverImage?.length < 1;
    },
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
      loading: false,
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
        coverImage: initialValues?.coverImage
          ? getFileListFromFileInfo([
              {
                url: initialValues?.coverImage,
              },
            ])
          : [],
      };
    },
    payloadTransformer(formValues) {
      return {
        ...formValues,
        minPlayers: Number(formValues.minPlayers),
        maxPlayers: Number(formValues.maxPlayers),
        coverImage: formValues.coverImage?.[0]?.response?.url ?? null,
      };
    },

    // upload
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(imageUrl) {
      if (!imageUrl) {
        return;
      }
      this.previewImage = imageUrl;
      this.previewVisible = true;
    },
    handleCoverChange(event) {
      const { file, fileList } = event;

      this.$data.form.coverImage = fileList;
      if (file.status === "loading") {
        this.$data.loading = true;
      }
      if (file.status === "done") {
        this.$data.loading = false;
      }
    },
  },
};
</script>
