import { users } from '~/const/users'
import { type User } from '~/types/types'
import { v4 as uuidv4 } from 'uuid';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const method = event.node.req.method;

  if (method === 'POST') {
    const user =  users.find((user: User) => {
      return user.credentials.username === body.email
        && user.credentials.passphrase === body.password
    });

    if (user) {
      return {
        access_token: uuidv4()
      } 
    } else {
      throw createError({
        statusCode: 401,
        statusMessage: 'Incorrect login or password',
      });
    }
  }
});