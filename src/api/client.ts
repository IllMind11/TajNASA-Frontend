import ky from 'ky';

import { getCookie } from './get-cookie';

const headers: any = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
};

async function setHeaders() {
  if (
    typeof window !== 'undefined' &&
    window.document &&
    window.document.documentElement
  ) {
    const token = getCookie('token');

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  } else {
    const { cookies: cookieStore } = await import('next/headers');
    const token = cookieStore().get('token')?.value;

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
}

export const client = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  mode: 'cors',
  cache: 'no-store',
  hooks: {
    beforeRequest: [
      async (options) => {
        await setHeaders();

        for (const [key, value] of Object.entries(headers)) {
          options.headers.set(key, value as string);
        }
      },
    ],
  },
});
