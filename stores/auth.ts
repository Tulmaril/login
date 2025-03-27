import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type TokenResponse, type User } from '~/types/types';
import { getCookie } from 'h3';

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null);

  const setApiToken = async () => {
    if (accessToken.value) {
      await $fetch('/api/token/set-token', {
        params: {
          token: accessToken.value,
        },
      });
    }
  };

  const clearApiToken = async () => {
    await $fetch('/api/token/clear-token');
  };

  const setTokens = async (access: string) => {
    accessToken.value = access;
    await setApiToken();
  };

  const clearTokens = async () => {
    accessToken.value = null;
    await clearApiToken();
  };

  const loadTokensFromCookies = async () => {
    if (import.meta.server) {
      const event = useRequestEvent();
      if (event) {
        const tokenCookie = getCookie(event, 'access_token');
        if (tokenCookie) {
          accessToken.value = tokenCookie;
          await setApiToken();
        } else {
          await clearApiToken();
        }
      }
    }

    if (import.meta.client) {
      if (!accessToken.value) {
        await clearApiToken();
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const data: TokenResponse = await $fetch<TokenResponse>('/api/auth/login', {
        method: 'POST',
        body: {
          email: email,
          password: password,
        },
      });

      if (data) {
        await setTokens(data.access_token);
        return data;
      }
    } catch (error) {
      return error;
    }
  };

  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', {
        method: 'POST',
      });
      await clearTokens();
      navigateTo('/');
    } catch (error) {
      console.error(error);
    }
  };

  return {
    accessToken,
    setApiToken,
    clearApiToken,
    setTokens,
    clearTokens,
    loadTokensFromCookies,
    login,
    logout,
  };
});