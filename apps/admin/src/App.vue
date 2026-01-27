<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
</script>

<template>
  <ElConfigProvider>
    <RouterView />
  </ElConfigProvider>
</template>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
