<script setup lang="ts">
import { Plus, Search, Edit, Delete, View } from "@element-plus/icons-vue";

const searchQuery = ref("");

const contents = ref([
  { id: 1, title: "Getting Started Guide", type: "Article", author: "John Doe", status: "Published", date: "2024-01-15" },
  { id: 2, title: "Product Features", type: "Page", author: "Jane Smith", status: "Draft", date: "2024-01-14" },
  { id: 3, title: "Company News", type: "Article", author: "Bob Johnson", status: "Published", date: "2024-01-13" },
  { id: 4, title: "FAQ Section", type: "Page", author: "Alice Brown", status: "Review", date: "2024-01-12" },
]);
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Content</h1>
      <el-button type="primary" :icon="Plus">New Content</el-button>
    </div>

    <el-card shadow="hover">
      <!-- Filters -->
      <div class="mb-4 flex gap-4">
        <el-input
          v-model="searchQuery"
          placeholder="Search content..."
          :prefix-icon="Search"
          clearable
          class="w-64"
        />
        <el-select placeholder="Type" clearable class="w-32">
          <el-option label="Article" value="article" />
          <el-option label="Page" value="page" />
        </el-select>
        <el-select placeholder="Status" clearable class="w-32">
          <el-option label="Published" value="published" />
          <el-option label="Draft" value="draft" />
          <el-option label="Review" value="review" />
        </el-select>
      </div>

      <!-- Table -->
      <el-table :data="contents" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="Title" min-width="200" />
        <el-table-column prop="type" label="Type" width="100">
          <template #default="{ row }">
            <el-tag type="info">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="Author" width="150" />
        <el-table-column prop="status" label="Status" width="120">
          <template #default="{ row }">
            <el-tag
              :type="row.status === 'Published' ? 'success' : row.status === 'Draft' ? 'info' : 'warning'"
            >
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="Date" width="120" />
        <el-table-column label="Actions" width="150" fixed="right">
          <template #default>
            <el-button :icon="View" text type="info" />
            <el-button :icon="Edit" text type="primary" />
            <el-button :icon="Delete" text type="danger" />
          </template>
        </el-table-column>
      </el-table>

      <!-- Pagination -->
      <div class="mt-4 flex justify-end">
        <el-pagination
          layout="prev, pager, next"
          :total="100"
          :page-size="10"
        />
      </div>
    </el-card>
  </div>
</template>
