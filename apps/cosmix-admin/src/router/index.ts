import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: { title: "仪表盘", icon: "Odometer" },
  },
  {
    path: "/templates",
    name: "Templates",
    component: () => import("@/views/Templates.vue"),
    meta: { title: "模板管理", icon: "Document" },
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/Settings.vue"),
    meta: { title: "系统设置", icon: "Setting" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
