import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: { title: "Login", hideLayout: true },
  },
  {
    path: "/",
    component: () => import("@/layouts/default.vue"),
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: { title: "Dashboard", icon: "Odometer" },
      },
      {
        path: "users",
        name: "Users",
        component: () => import("@/views/users/index.vue"),
        meta: { title: "Users", icon: "User" },
      },
      {
        path: "content",
        name: "Content",
        component: () => import("@/views/content/index.vue"),
        meta: { title: "Content", icon: "Document" },
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("@/views/settings/index.vue"),
        meta: { title: "Settings", icon: "Setting" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
