<script setup lang="ts">
import { TrendCharts, User, Document, View } from "@element-plus/icons-vue";

const stats = [
  { title: "Total Users", value: "1,234", icon: User, color: "#409EFF", change: "+12%" },
  { title: "Total Content", value: "567", icon: Document, color: "#67C23A", change: "+8%" },
  { title: "Page Views", value: "89,012", icon: View, color: "#E6A23C", change: "+24%" },
  { title: "Revenue", value: "$12,345", icon: TrendCharts, color: "#F56C6C", change: "+15%" },
];

const recentActivities = [
  { user: "John Doe", action: "Created new content", time: "5 minutes ago" },
  { user: "Jane Smith", action: "Updated settings", time: "15 minutes ago" },
  { user: "Bob Johnson", action: "Added new user", time: "1 hour ago" },
  { user: "Alice Brown", action: "Published article", time: "2 hours ago" },
];
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Dashboard</h1>

    <!-- Stats Cards -->
    <el-row :gutter="20">
      <el-col v-for="stat in stats" :key="stat.title" :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="mb-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">{{ stat.title }}</p>
              <p class="mt-1 text-2xl font-bold">{{ stat.value }}</p>
              <p class="mt-1 text-xs text-green-500">{{ stat.change }} from last month</p>
            </div>
            <div
              class="flex h-12 w-12 items-center justify-center rounded-lg"
              :style="{ backgroundColor: stat.color + '20' }"
            >
              <el-icon :size="24" :style="{ color: stat.color }">
                <component :is="stat.icon" />
              </el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Recent Activity -->
    <el-card shadow="hover">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="font-semibold">Recent Activity</span>
          <el-button text type="primary">View All</el-button>
        </div>
      </template>

      <el-table :data="recentActivities" stripe>
        <el-table-column prop="user" label="User" />
        <el-table-column prop="action" label="Action" />
        <el-table-column prop="time" label="Time" width="150" />
      </el-table>
    </el-card>
  </div>
</template>
