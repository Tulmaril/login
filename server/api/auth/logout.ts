export default defineEventHandler(async (event) => {
  const baseURL = getRequestURL(event).origin
  const token = parseCookies(event).access_token;

  try {
    const res = await $fetch(`${baseURL}/api/backend/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    return res
  } catch (error) {
    return error
  }
});
