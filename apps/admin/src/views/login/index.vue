<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const loginForm = reactive({
  username: "",
  password: "",
});

const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  // Simulate login
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loading.value = false;
  router.push("/dashboard");
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <el-card class="w-full max-w-md" shadow="hover">
      <template #header>
        <div class="text-center">
          <h1 class="text-2xl font-bold">Super One Admin</h1>
          <p class="mt-2 text-gray-500">Sign in to your account</p>
        </div>
      </template>

      <el-form :model="loginForm" label-position="top" @submit.prevent="handleLogin">
        <el-form-item label="Username">
          <el-input
            v-model="loginForm.username"
            placeholder="Enter username"
            size="large"
          />
        </el-form-item>

        <el-form-item label="Password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="Enter password"
            size="large"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            :loading="loading"
            class="w-full"
            native-type="submit"
          >
            Sign In
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
