import useSWR from 'swr';
import { fetcher } from '../utils';
import { API_ENDPOINT } from '../constants';

export const useAPIData = (path: string) => {
  return useSWR(`${API_ENDPOINT}${path}`, fetcher);
};
