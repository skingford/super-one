<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { Plus, Refresh } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import type { Template } from "@super-one/cosmix-types";
import { useTemplateStore } from "@/stores/template";
import TemplateTable from "@/components/templates/TemplateTable.vue";
import TemplateForm from "@/components/templates/TemplateForm.vue";

const templateStore = useTemplateStore();
const { templates, loading } = storeToRefs(templateStore);

const formVisible = ref(false);
const editingTemplate = ref<Template | null>(null);

onMounted(() => {
  templateStore.fetchTemplates();
});

function handleCreate() {
  editingTemplate.value = null;
  formVisible.value = true;
}

function handleEdit(template: Template) {
  editingTemplate.value = template;
  formVisible.value = true;
}

async function handleDelete(id: string) {
  await templateStore.deleteTemplate(id);
  ElMessage.success("删除成功");
}

async function handleSubmit(
  data: Omit<Template, "id" | "createdAt" | "updatedAt" | "usageCount">
) {
  if (editingTemplate.value) {
    await templateStore.updateTemplate(editingTemplate.value.id, data);
    ElMessage.success("更新成功");
  } else {
    await templateStore.createTemplate(data);
    ElMessage.success("创建成功");
  }
}

function handleRefresh() {
  templateStore.fetchTemplates();
  ElMessage.success("刷新成功");
}
</script>

<template>
  <div class="templates-page">
    <el-card class="page-card">
      <template #header>
        <div class="card-header">
          <div class="header-left">
            <span class="title">模板列表</span>
            <el-tag type="info" size="small">
              共 {{ templates.length }} 个
            </el-tag>
          </div>
          <div class="header-right">
            <el-button :icon="Refresh" @click="handleRefresh">刷新</el-button>
            <el-button type="primary" :icon="Plus" @click="handleCreate">
              新建模板
            </el-button>
          </div>
        </div>
      </template>

      <TemplateTable
        :data="templates"
        :loading="loading"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </el-card>

    <TemplateForm
      v-model:visible="formVisible"
      :template="editingTemplate"
      @submit="handleSubmit"
    />
  </div>
</template>

<style scoped>
.templates-page {
  max-width: 1400px;
}

.page-card {
  min-height: calc(100vh - 200px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title {
  font-size: 16px;
  font-weight: 600;
}

.header-right {
  display: flex;
  gap: 12px;
}
</style>
