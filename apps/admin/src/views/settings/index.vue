<script setup lang="ts">
const settingsForm = reactive({
  siteName: "Super One",
  siteDescription: "A Super Individual Personal Brand Website",
  contactEmail: "hello@superone.dev",
  enableNotifications: true,
  enableAnalytics: true,
  maintenanceMode: false,
});

const handleSave = () => {
  ElMessage.success("Settings saved successfully");
};
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Settings</h1>

    <el-row :gutter="20">
      <!-- General Settings -->
      <el-col :xs="24" :lg="12">
        <el-card shadow="hover">
          <template #header>
            <span class="font-semibold">General Settings</span>
          </template>

          <el-form :model="settingsForm" label-position="top">
            <el-form-item label="Site Name">
              <el-input v-model="settingsForm.siteName" />
            </el-form-item>

            <el-form-item label="Site Description">
              <el-input
                v-model="settingsForm.siteDescription"
                type="textarea"
                :rows="3"
              />
            </el-form-item>

            <el-form-item label="Contact Email">
              <el-input v-model="settingsForm.contactEmail" type="email" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="handleSave">Save Changes</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <!-- Feature Toggles -->
      <el-col :xs="24" :lg="12">
        <el-card shadow="hover">
          <template #header>
            <span class="font-semibold">Feature Toggles</span>
          </template>

          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">Email Notifications</p>
                <p class="text-sm text-gray-500">Receive email notifications for important events</p>
              </div>
              <el-switch v-model="settingsForm.enableNotifications" />
            </div>

            <el-divider />

            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">Analytics</p>
                <p class="text-sm text-gray-500">Enable website analytics tracking</p>
              </div>
              <el-switch v-model="settingsForm.enableAnalytics" />
            </div>

            <el-divider />

            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">Maintenance Mode</p>
                <p class="text-sm text-gray-500">Show maintenance page to visitors</p>
              </div>
              <el-switch v-model="settingsForm.maintenanceMode" type="danger" />
            </div>
          </div>
        </el-card>

        <!-- Danger Zone -->
        <el-card shadow="hover" class="mt-4">
          <template #header>
            <span class="font-semibold text-red-500">Danger Zone</span>
          </template>

          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Clear Cache</p>
              <p class="text-sm text-gray-500">Clear all cached data</p>
            </div>
            <el-button type="danger" plain>Clear Cache</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
