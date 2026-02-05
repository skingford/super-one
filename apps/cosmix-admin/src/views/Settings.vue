<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import { useConfigStore } from "@/stores/config";

const configStore = useConfigStore();
const { generationConfig, loading } = storeToRefs(configStore);

const formData = ref({
  maxLength: 2000,
  temperature: 0.8,
  model: "gpt-4o-mini",
});

const modelOptions = [
  { value: "gpt-4o-mini", label: "GPT-4o Mini (推荐)" },
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "claude-3-haiku", label: "Claude 3 Haiku" },
  { value: "claude-3-sonnet", label: "Claude 3 Sonnet" },
];

onMounted(() => {
  formData.value = { ...generationConfig.value };
});

async function handleSave() {
  await configStore.updateConfig(formData.value);
  ElMessage.success("保存成功");
}

function handleReset() {
  formData.value = {
    maxLength: 2000,
    temperature: 0.8,
    model: "gpt-4o-mini",
  };
}
</script>

<template>
  <div class="settings-page">
    <el-row :gutter="20">
      <el-col :xs="24" :lg="12">
        <el-card class="settings-card">
          <template #header>
            <span class="card-title">AI 生成配置</span>
          </template>

          <el-form
            :model="formData"
            label-width="120px"
            label-position="left"
          >
            <el-form-item label="内容长度">
              <div class="slider-container">
                <el-slider
                  v-model="formData.maxLength"
                  :min="500"
                  :max="5000"
                  :step="100"
                  :marks="{
                    500: '500',
                    2000: '2000',
                    5000: '5000',
                  }"
                />
                <span class="slider-value">{{ formData.maxLength }} 字</span>
              </div>
            </el-form-item>

            <el-form-item label="创意程度">
              <div class="slider-container">
                <el-slider
                  v-model="formData.temperature"
                  :min="0"
                  :max="1"
                  :step="0.1"
                  :marks="{
                    0: '保守',
                    0.5: '均衡',
                    1: '创意',
                  }"
                />
                <span class="slider-value">{{ formData.temperature }}</span>
              </div>
              <div class="form-tip">
                值越高，生成内容越有创意但可能不稳定
              </div>
            </el-form-item>

            <el-form-item label="AI 模型">
              <el-select v-model="formData.model" style="width: 100%">
                <el-option
                  v-for="opt in modelOptions"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" :loading="loading" @click="handleSave">
                保存配置
              </el-button>
              <el-button @click="handleReset">恢复默认</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <el-col :xs="24" :lg="12">
        <el-card class="settings-card">
          <template #header>
            <span class="card-title">通知配置</span>
          </template>

          <el-form label-width="120px" label-position="left">
            <el-form-item label="钉钉 Webhook">
              <el-input
                placeholder="https://oapi.dingtalk.com/robot/send?access_token=..."
                type="textarea"
                :rows="2"
              />
              <div class="form-tip">
                用于接收系统通知，如生成完成、异常告警等
              </div>
            </el-form-item>

            <el-form-item label="通知开关">
              <el-switch active-text="启用" inactive-text="禁用" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" disabled>保存（MVP 暂不支持）</el-button>
              <el-button disabled>测试连接</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="settings-card" style="margin-top: 20px">
          <template #header>
            <span class="card-title">发布平台</span>
          </template>

          <el-empty description="MVP 版本暂不支持平台管理" :image-size="80" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.settings-page {
  max-width: 1200px;
}

.settings-card {
  margin-bottom: 20px;
}

.card-title {
  font-weight: 600;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.slider-container .el-slider {
  flex: 1;
}

.slider-value {
  width: 80px;
  text-align: right;
  font-weight: 600;
  color: #8B5CF6;
}

.form-tip {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
}
</style>
