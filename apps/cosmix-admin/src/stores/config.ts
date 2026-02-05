import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { GenerationConfig, SystemStatus } from "@super-one/cosmix-types";

// Mock 数据
const mockSystemStatus: SystemStatus = {
  apiHealth: "healthy",
  aiQuota: {
    used: 1250,
    limit: 5000,
    resetAt: "2026-02-06T00:00:00Z",
  },
  dailyGenerations: {
    count: 15,
    limit: 50,
  },
};

const mockGenerationConfig: GenerationConfig = {
  maxLength: 2000,
  temperature: 0.8,
  model: "gpt-4o-mini",
};

export const useConfigStore = defineStore("config", () => {
  const systemStatus = ref<SystemStatus>(mockSystemStatus);
  const generationConfig = ref<GenerationConfig>(mockGenerationConfig);
  const loading = ref(false);

  const aiQuotaPercent = computed(() =>
    Math.round((systemStatus.value.aiQuota.used / systemStatus.value.aiQuota.limit) * 100)
  );

  const dailyPercent = computed(() =>
    Math.round(
      (systemStatus.value.dailyGenerations.count / systemStatus.value.dailyGenerations.limit) * 100
    )
  );

  const isHealthy = computed(() => systemStatus.value.apiHealth === "healthy");

  async function fetchStatus() {
    loading.value = true;
    try {
      // TODO: 替换为真实 API 调用
      await new Promise((resolve) => setTimeout(resolve, 300));
    } finally {
      loading.value = false;
    }
  }

  async function updateConfig(config: Partial<GenerationConfig>) {
    loading.value = true;
    try {
      generationConfig.value = { ...generationConfig.value, ...config };
      // TODO: 保存到后端
      await new Promise((resolve) => setTimeout(resolve, 300));
    } finally {
      loading.value = false;
    }
  }

  return {
    systemStatus,
    generationConfig,
    loading,
    aiQuotaPercent,
    dailyPercent,
    isHealthy,
    fetchStatus,
    updateConfig,
  };
});
