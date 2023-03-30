/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event);
  response.headers.set('Strict-Transport-Security', 'max-age=3600; includeSubDomains;');

  return response;
}
