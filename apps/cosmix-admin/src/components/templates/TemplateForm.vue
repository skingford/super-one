<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import type { Template, TemplateCategory } from "@super-one/cosmix-types";
import { TEMPLATE_CATEGORY_LABELS } from "@super-one/cosmix-types";

interface Props {
  visible: boolean;
  template?: Template | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:visible": [value: boolean];
  submit: [data: Omit<Template, "id" | "createdAt" | "updatedAt" | "usageCount">];
}>();

const formRef = ref<FormInstance>();

const defaultForm = {
  name: "",
  category: "campus" as TemplateCategory,
  description: "",
  promptTemplate: "",
  tags: [] as string[],
  isActive: true,
};

const form = ref({ ...defaultForm });
const tagInput = ref("");

const isEdit = computed(() => !!props.template);
const title = computed(() => (isEdit.value ? "编辑模板" : "新建模板"));

const categoryOptions = Object.entries(TEMPLATE_CATEGORY_LABELS).map(
  ([value, label]) => ({
    value,
    label,
  })
);

const rules: FormRules = {
  name: [
    { required: true, message: "请输入模板名称", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" },
  ],
  category: [{ required: true, message: "请选择分类", trigger: "change" }],
  description: [
    { required: true, message: "请输入模板描述", trigger: "blur" },
    { min: 10, max: 200, message: "长度在 10 到 200 个字符", trigger: "blur" },
  ],
  promptTemplate: [
    { required: true, message: "请输入 Prompt 模板", trigger: "blur" },
    { min: 20, message: "Prompt 模板至少 20 个字符", trigger: "blur" },
  ],
};

watch(
  () => props.visible,
  (val) => {
    if (val && props.template) {
      form.value = {
        name: props.template.name,
        category: props.template.category,
        description: props.template.description,
        promptTemplate: props.template.promptTemplate,
        tags: [...props.template.tags],
        isActive: props.template.isActive,
      };
    } else if (val) {
      form.value = { ...defaultForm };
    }
  }
);

function handleClose() {
  emit("update:visible", false);
  formRef.value?.resetFields();
  form.value = { ...defaultForm };
}

function addTag() {
  const tag = tagInput.value.trim();
  if (tag && !form.value.tags.includes(tag)) {
    form.value.tags.push(tag);
  }
  tagInput.value = "";
}

function removeTag(tag: string) {
  form.value.tags = form.value.tags.filter((t) => t !== tag);
}

async function handleSubmit() {
  const valid = await formRef.value?.validate();
  if (valid) {
    emit("submit", { ...form.value });
    handleClose();
  }
}
</script>

<template>
  <el-dialog
    :model-value="visible"
    :title="title"
    width="600px"
    destroy-on-close
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="100px"
      label-position="left"
    >
      <el-form-item label="模板名称" prop="name">
        <el-input v-model="form.name" placeholder="例如：逆袭打脸" />
      </el-form-item>

      <el-form-item label="分类" prop="category">
        <el-select v-model="form.category" placeholder="选择分类">
          <el-option
            v-for="opt in categoryOptions"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="描述" prop="description">
        <el-input
          v-model="form.description"
          type="textarea"
          :rows="2"
          placeholder="简要描述模板的用途和特点"
        />
      </el-form-item>

      <el-form-item label="Prompt 模板" prop="promptTemplate">
        <el-input
          v-model="form.promptTemplate"
          type="textarea"
          :rows="4"
          placeholder="使用 {变量名} 作为占位符，例如：以{主角}为主角..."
        />
      </el-form-item>

      <el-form-item label="标签">
        <div class="tags-container">
          <el-tag
            v-for="tag in form.tags"
            :key="tag"
            closable
            class="tag-item"
            @close="removeTag(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-model="tagInput"
            size="small"
            class="tag-input"
            placeholder="输入标签"
            @keyup.enter="addTag"
            @blur="addTag"
          />
        </div>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch
          v-model="form.isActive"
          active-text="启用"
          inactive-text="禁用"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit">
        {{ isEdit ? "保存" : "创建" }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.tag-item {
  margin: 0;
}

.tag-input {
  width: 100px;
}
</style>
