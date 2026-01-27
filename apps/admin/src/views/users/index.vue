<script setup lang="ts">
import { Plus, Search, Edit, Delete } from "@element-plus/icons-vue";

const searchQuery = ref("");
const dialogVisible = ref(false);

const users = ref([
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
]);

const handleEdit = (row: (typeof users.value)[0]) => {
  ElMessage.info(`Edit user: ${row.name}`);
};

const handleDelete = (row: (typeof users.value)[0]) => {
  ElMessageBox.confirm(`Are you sure to delete ${row.name}?`, "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  }).then(() => {
    ElMessage.success("Deleted successfully");
  });
};
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Users</h1>
      <el-button type="primary" :icon="Plus" @click="dialogVisible = true">
        Add User
      </el-button>
    </div>

    <el-card shadow="hover">
      <!-- Search -->
      <div class="mb-4">
        <el-input
          v-model="searchQuery"
          placeholder="Search users..."
          :prefix-icon="Search"
          clearable
          class="w-64"
        />
      </div>

      <!-- Table -->
      <el-table :data="users" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="email" label="Email" />
        <el-table-column prop="role" label="Role" width="120">
          <template #default="{ row }">
            <el-tag :type="row.role === 'Admin' ? 'danger' : row.role === 'Editor' ? 'warning' : 'info'">
              {{ row.role }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status" width="120">
          <template #default="{ row }">
            <el-tag :type="row.status === 'Active' ? 'success' : 'info'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="150" fixed="right">
          <template #default="{ row }">
            <el-button :icon="Edit" text type="primary" @click="handleEdit(row)" />
            <el-button :icon="Delete" text type="danger" @click="handleDelete(row)" />
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

    <!-- Add User Dialog -->
    <el-dialog v-model="dialogVisible" title="Add User" width="500">
      <el-form label-position="top">
        <el-form-item label="Name">
          <el-input placeholder="Enter name" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input placeholder="Enter email" />
        </el-form-item>
        <el-form-item label="Role">
          <el-select placeholder="Select role" class="w-full">
            <el-option label="Admin" value="admin" />
            <el-option label="Editor" value="editor" />
            <el-option label="Viewer" value="viewer" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Create</el-button>
      </template>
    </el-dialog>
  </div>
</template>
