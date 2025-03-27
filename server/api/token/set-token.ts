export default defineEventHandler( async (event) => {
  const token: string = String(getQuery(event).token);

  if (token) {
    setCookie(event, 'access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'strict',
    });
  }  
  return { message: 'Token set' };
});
