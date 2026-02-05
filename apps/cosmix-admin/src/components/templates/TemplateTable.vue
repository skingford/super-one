<script setup lang="ts">
import { Edit, Delete } from "@element-plus/icons-vue";
import type { Template, TemplateCategory } from "@super-one/cosmix-types";
import { TEMPLATE_CATEGORY_LABELS } from "@super-one/cosmix-types";

interface Props {
  data: Template[];
  loading?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  edit: [template: Template];
  delete: [id: string];
  toggleActive: [id: string];
}>();

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
</script>

<template>
  <el-table
    :data="data"
    :loading="loading"
    stripe
    style="width: 100%"
  >
    <el-table-column prop="name" label="模板名称" min-width="120">
      <template #default="{ row }">
        <div class="template-name">
          <span class="name-text">{{ row.name }}</span>
          <el-tag
            :type="row.isActive ? 'success' : 'info'"
            size="small"
            effect="light"
          >
            {{ row.isActive ? "启用" : "禁用" }}
          </el-tag>
        </div>
      </template>
    </el-table-column>

    <el-table-column prop="category" label="分类" width="100">
      <template #default="{ row }">
        <el-tag type="primary" effect="plain" size="small">
          {{ TEMPLATE_CATEGORY_LABELS[row.category as TemplateCategory] }}
        </el-tag>
      </template>
    </el-table-column>

    <el-table-column prop="description" label="描述" min-width="200">
      <template #default="{ row }">
        <el-text type="info" truncated>{{ row.description }}</el-text>
      </template>
    </el-table-column>

    <el-table-column prop="tags" label="标签" width="180">
      <template #default="{ row }">
        <div class="tags-cell">
          <el-tag
            v-for="tag in row.tags.slice(0, 2)"
            :key="tag"
            size="small"
            type="info"
            effect="plain"
            class="tag-item"
          >
            {{ tag }}
          </el-tag>
          <el-tag
            v-if="row.tags.length > 2"
            size="small"
            type="info"
            effect="plain"
          >
            +{{ row.tags.length - 2 }}
          </el-tag>
        </div>
      </template>
    </el-table-column>

    <el-table-column prop="usageCount" label="使用次数" width="100" align="center">
      <template #default="{ row }">
        <span class="usage-count">{{ row.usageCount }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="updatedAt" label="更新时间" width="120">
      <template #default="{ row }">
        {{ formatDate(row.updatedAt) }}
      </template>
    </el-table-column>

    <el-table-column label="操作" width="160" fixed="right">
      <template #default="{ row }">
        <el-button
          type="primary"
          link
          :icon="Edit"
          @click="emit('edit', row)"
        >
          编辑
        </el-button>
        <el-popconfirm
          title="确定删除该模板？"
          confirm-button-text="删除"
          cancel-button-text="取消"
          @confirm="emit('delete', row.id)"
        >
          <template #reference>
            <el-button type="danger" link :icon="Delete">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.template-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name-text {
  font-weight: 500;
}

.tags-cell {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tag-item {
  margin: 0;
}

.usage-count {
  font-weight: 600;
  color: #8B5CF6;
}
</style>
