import axios from 'axios';
import Cookies from 'js-cookie';

export const fetcher = async (url: string) => {
  const token = Cookies.get('token');

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });

  return data;
};
