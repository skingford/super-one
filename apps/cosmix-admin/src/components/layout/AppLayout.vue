<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  Odometer,
  Document,
  Setting,
  Expand,
  Fold,
} from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();
const isCollapsed = ref(false);

const menuItems = [
  { path: "/dashboard", title: "仪表盘", icon: Odometer },
  { path: "/templates", title: "模板管理", icon: Document },
  { path: "/settings", title: "系统设置", icon: Setting },
];

const activeMenu = computed(() => route.path);

function handleSelect(path: string) {
  router.push(path);
}

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
}
</script>

<template>
  <el-container class="app-container">
    <el-aside :width="isCollapsed ? '64px' : '220px'" class="app-aside">
      <div class="logo-container">
        <div class="logo">
          <span class="logo-icon">C</span>
          <span v-show="!isCollapsed" class="logo-text">Cosmix</span>
        </div>
      </div>

      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapsed"
        :collapse-transition="false"
        background-color="#1f2937"
        text-color="#9ca3af"
        active-text-color="#8B5CF6"
        @select="handleSelect"
      >
        <el-menu-item
          v-for="item in menuItems"
          :key="item.path"
          :index="item.path"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </el-menu>

      <div class="collapse-btn" @click="toggleCollapse">
        <el-icon :size="18">
          <Expand v-if="isCollapsed" />
          <Fold v-else />
        </el-icon>
      </div>
    </el-aside>

    <el-container>
      <el-header class="app-header">
        <div class="header-left">
          <h1 class="page-title">{{ route.meta.title }}</h1>
        </div>
        <div class="header-right">
          <el-tag type="success" size="small">MVP</el-tag>
          <el-avatar :size="32" class="user-avatar">
            <span>A</span>
          </el-avatar>
        </div>
      </el-header>

      <el-main class="app-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.app-aside {
  background-color: #1f2937;
  transition: width 0.2s;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
}

.logo-container {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #374151;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 18px;
}

.logo-text {
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.collapse-btn {
  margin-top: auto;
  padding: 16px;
  display: flex;
  justify-content: center;
  color: #9ca3af;
  cursor: pointer;
  border-top: 1px solid #374151;
  transition: color 0.2s;
}

.collapse-btn:hover {
  color: #8B5CF6;
}

.app-header {
  background: white;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  margin-left: v-bind("isCollapsed ? '64px' : '220px'");
  transition: margin-left 0.2s;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-avatar {
  background: linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%);
  cursor: pointer;
}

.app-main {
  margin-left: v-bind("isCollapsed ? '64px' : '220px'");
  padding: 24px;
  background: #f5f7fa;
  min-height: calc(100vh - 64px);
  transition: margin-left 0.2s;
}
</style>
