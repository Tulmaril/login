import { list } from '~/const/list'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const method = event.node.req.method;

  if (method === 'GET') {
    return [...list]
  }
});