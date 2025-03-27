export default defineEventHandler((event) => {
  setCookie(event, 'access_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1,
    path: '/',
  });

  return { message: 'Token cleared' };
});
