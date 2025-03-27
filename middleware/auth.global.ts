import { getCookie } from 'h3';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (import.meta.server) {
    const event = useRequestEvent();
    if (event) {
      const token = getCookie(event, 'access_token');

      if (!token && to.path !== '/') {
        return navigateTo('/');
      }
    }
  } else {
    if ( !authStore.accessToken && to.path !== '/' ) {
      return navigateTo('/');
    }
  }
});
