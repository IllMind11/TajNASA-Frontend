import { cookies } from 'next/headers';

export function getToken() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (token) return token.value;

  return null;
}
