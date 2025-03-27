<template>
  <button @click="handleLogout" class="button">Выход</button>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout()
}
</script>