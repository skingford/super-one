<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import {
  Promotion,
  DataAnalysis,
  Cpu,
  Timer,
} from "@element-plus/icons-vue";
import StatusCard from "@/components/dashboard/StatusCard.vue";
import { useConfigStore } from "@/stores/config";
import { useTemplateStore } from "@/stores/template";

const configStore = useConfigStore();
const templateStore = useTemplateStore();

const { systemStatus, aiQuotaPercent, dailyPercent, isHealthy } =
  storeToRefs(configStore);
const { templates, totalUsage, activeTemplates } = storeToRefs(templateStore);

onMounted(() => {
  configStore.fetchStatus();
  templateStore.fetchTemplates();
});

function formatResetTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours > 0) {
    return `${hours} 小时后重置`;
  }
  return "即将重置";
}
</script>

<template>
  <div class="dashboard">
    <!-- 系统状态卡片 -->
    <el-row :gutter="20" class="status-row">
      <el-col :xs="24" :sm="12" :lg="6">
        <StatusCard
          title="API 状态"
          :value="isHealthy ? '正常' : '异常'"
          :type="isHealthy ? 'success' : 'danger'"
        >
          <template #icon>
            <Promotion />
          </template>
        </StatusCard>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <StatusCard
          title="AI 配额使用"
          :value="systemStatus.aiQuota.used"
          :suffix="`/ ${systemStatus.aiQuota.limit}`"
          :progress="aiQuotaPercent"
          :type="aiQuotaPercent > 80 ? 'warning' : 'info'"
        >
          <template #icon>
            <Cpu />
          </template>
        </StatusCard>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <StatusCard
          title="今日生成"
          :value="systemStatus.dailyGenerations.count"
          :suffix="`/ ${systemStatus.dailyGenerations.limit}`"
          :progress="dailyPercent"
          type="primary"
        >
          <template #icon>
            <Timer />
          </template>
        </StatusCard>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <StatusCard
          title="累计使用"
          :value="totalUsage"
          suffix="次"
          type="success"
        >
          <template #icon>
            <DataAnalysis />
          </template>
        </StatusCard>
      </el-col>
    </el-row>

    <!-- 快捷信息 -->
    <el-row :gutter="20" class="info-row">
      <el-col :xs="24" :lg="12">
        <el-card class="info-card">
          <template #header>
            <div class="card-header">
              <span>模板概览</span>
              <el-button type="primary" link @click="$router.push('/templates')">
                查看全部
              </el-button>
            </div>
          </template>
          <div class="template-stats">
            <div class="stat-item">
              <div class="stat-value">{{ templates.length }}</div>
              <div class="stat-label">总模板数</div>
            </div>
            <div class="stat-item">
              <div class="stat-value active">{{ activeTemplates.length }}</div>
              <div class="stat-label">已启用</div>
            </div>
            <div class="stat-item">
              <div class="stat-value inactive">
                {{ templates.length - activeTemplates.length }}
              </div>
              <div class="stat-label">已禁用</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :lg="12">
        <el-card class="info-card">
          <template #header>
            <div class="card-header">
              <span>配额信息</span>
              <el-tag size="small">
                {{ formatResetTime(systemStatus.aiQuota.resetAt) }}
              </el-tag>
            </div>
          </template>
          <div class="quota-info">
            <div class="quota-item">
              <span class="quota-label">已使用</span>
              <span class="quota-value">{{ systemStatus.aiQuota.used }} tokens</span>
            </div>
            <div class="quota-item">
              <span class="quota-label">剩余</span>
              <span class="quota-value remaining">
                {{ systemStatus.aiQuota.limit - systemStatus.aiQuota.used }} tokens
              </span>
            </div>
            <el-progress
              :percentage="aiQuotaPercent"
              :color="aiQuotaPercent > 80 ? '#F59E0B' : '#8B5CF6'"
              :stroke-width="8"
              class="quota-progress"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 使用提示 -->
    <el-alert
      title="MVP 版本提示"
      type="info"
      :closable="false"
      show-icon
      class="mvp-alert"
    >
      <template #default>
        当前为 MVP 版本，数据展示为模拟数据。后续将接入真实 API。
      </template>
    </el-alert>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1400px;
}

.status-row {
  margin-bottom: 20px;
}

.status-row .el-col {
  margin-bottom: 20px;
}

.info-row {
  margin-bottom: 20px;
}

.info-row .el-col {
  margin-bottom: 20px;
}

.info-card {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.template-stats {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 36px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
  margin-bottom: 8px;
}

.stat-value.active {
  color: #10B981;
}

.stat-value.inactive {
  color: #9ca3af;
}

.stat-label {
  font-size: 14px;
  color: #6b7280;
}

.quota-info {
  padding: 12px 0;
}

.quota-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.quota-label {
  color: #6b7280;
}

.quota-value {
  font-weight: 600;
  color: #1f2937;
}

.quota-value.remaining {
  color: #10B981;
}

.quota-progress {
  margin-top: 16px;
}

.mvp-alert {
  margin-top: 20px;
}
</style>
