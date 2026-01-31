<script setup lang="ts">
import { useRoute } from "vue-router";
import { Odometer, User, Document, Setting, Expand, Fold } from "@element-plus/icons-vue";

const route = useRoute();
const isCollapse = ref(false);

const menuItems = [
  { path: "/dashboard", title: "Dashboard", icon: Odometer },
  { path: "/users", title: "Users", icon: User },
  { path: "/content", title: "Content", icon: Document },
  { path: "/settings", title: "Settings", icon: Setting },
];

const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<template>
  <el-container class="h-full">
    <!-- Sidebar -->
    <el-aside :width="isCollapse ? '64px' : '220px'" class="border-r border-gray-200 transition-all duration-300">
      <div class="flex h-14 items-center justify-center border-b border-gray-200 px-4">
        <span v-if="!isCollapse" class="text-lg font-semibold">Super One</span>
        <span v-else class="text-lg font-semibold">S</span>
      </div>
      <el-menu
        :default-active="route.path"
        :collapse="isCollapse"
        router
        class="border-none"
      >
        <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
          <el-icon><component :is="item.icon" /></el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- Main Content -->
    <el-container>
      <!-- Header -->
      <el-header class="flex items-center justify-between border-b border-gray-200 bg-white px-4">
        <div class="flex items-center gap-4">
          <el-button :icon="isCollapse ? Expand : Fold" text @click="toggleSidebar" />
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item>{{ route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="flex items-center gap-4">
          <el-dropdown>
            <span class="flex cursor-pointer items-center gap-2">
              <el-avatar :size="32">A</el-avatar>
              <span class="text-sm">Admin</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Profile</el-dropdown-item>
                <el-dropdown-item divided>Logout</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- Page Content -->
      <el-main class="bg-gray-50">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-menu {
  border-right: none;
}
</style>
