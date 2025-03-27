import { type TokenResponse } from '~/types/types'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const baseURL = getRequestURL(event).origin

  try {
    const tokenResponse = await $fetch<TokenResponse>(`${baseURL}/api/backend/users`, {
        method: 'POST',
        body: { email: body.email, password: body.password },
      }
    );

    return tokenResponse
  } catch (error) {
    return error
  }
});
