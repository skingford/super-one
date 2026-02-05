<script setup lang="ts">
import { computed } from "vue";

interface Props {
  title: string;
  value: string | number;
  suffix?: string;
  type?: "primary" | "success" | "warning" | "danger" | "info";
  icon?: string;
  progress?: number;
}

const props = withDefaults(defineProps<Props>(), {
  type: "primary",
  suffix: "",
});

const colorMap = {
  primary: "#8B5CF6",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#06B6D4",
};

const bgColorMap = {
  primary: "#F5F3FF",
  success: "#D1FAE5",
  warning: "#FEF3C7",
  danger: "#FEE2E2",
  info: "#ECFEFF",
};

const color = computed(() => colorMap[props.type]);
const bgColor = computed(() => bgColorMap[props.type]);
</script>

<template>
  <el-card class="status-card" shadow="hover">
    <div class="card-content">
      <div class="card-icon" :style="{ backgroundColor: bgColor }">
        <el-icon :size="24" :style="{ color }">
          <slot name="icon" />
        </el-icon>
      </div>
      <div class="card-info">
        <div class="card-title">{{ title }}</div>
        <div class="card-value" :style="{ color }">
          {{ value }}
          <span v-if="suffix" class="card-suffix">{{ suffix }}</span>
        </div>
        <el-progress
          v-if="progress !== undefined"
          :percentage="progress"
          :color="color"
          :stroke-width="4"
          :show-text="false"
          class="card-progress"
        />
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.status-card {
  height: 100%;
}

.card-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-info {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 4px;
}

.card-value {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
}

.card-suffix {
  font-size: 14px;
  font-weight: 400;
  color: #9ca3af;
  margin-left: 4px;
}

.card-progress {
  margin-top: 8px;
}
</style>
