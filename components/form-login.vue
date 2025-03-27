<template>
  <form @submit.prevent="handleSubmit" class="login">
    <FormInput
      v-model="email"
      label="Email"
      @input="clearError('email')"
      :error="errors.email"
      :error-message="errors.email"
    />
    <FormInput
      v-model="password"
      label="Password"
      type="password"
      @input="clearError('password')"
      :error="errors.password"
      :error-message="errors.password"
    />
    <button class="button" type="submit" :disabled="loading">Войти</button>
    <p v-if="serverError" class="login__error">{{ serverError }}</p>
  </form>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import type { TokenResponse, LoginFormErrors } from '~/types/types';

const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const errors = ref<LoginFormErrors>({
  email: '',
  password: '',
});
const serverError = ref('');
const loading = ref(false);

const clearError = (field: 'email' | 'password') => {
  if (errors.value[field]) {
    errors.value[field] = '';
  }
};

const validateForm = () => {
  if (!validateEmail(email.value)) {
    errors.value.email = 'Invalid email';
  }

  if (!validateMinLength(password.value)) {
    errors.value.password = 'The password must be at least 6 characters.';
  }

  return Object.values(errors.value).join('').length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  loading.value = true;
  serverError.value = '';
  const res = await authStore.login(email.value, password.value) as TokenResponse;
  if (!res.access_token) {
    loading.value = false;
    showIncorrectPassword();
  }
  
  navigateTo('/profile');
};

function showIncorrectPassword() {
  serverError.value = 'Введены неверные данные авторизации. Попробуйте ещё раз'
}
</script>