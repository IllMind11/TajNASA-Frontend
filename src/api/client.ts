import ky from 'ky';

export const client = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  mode: 'cors',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  },
});
