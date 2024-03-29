import { GRAY_300, SECONDARY, WHITE } from './colors';

export const API_ENDPOINT = 'https://api.mandarin.weniv.co.kr';

export const BORDER = {
  basic: `1px solid ${GRAY_300}`,
  active_color: `${SECONDARY}`,
};

export const BUTTON = {
  background_color: `${SECONDARY}`,
  disabled_color: `${GRAY_300}`,
  color: `${WHITE}`,
};

export const USER_AVATAR = {
  xs: {
    size: '36px',
  },
  sm: {
    size: '42px',
  },
  md: {
    size: '50px',
  },
  lg: {
    size: '110px',
  },
};

export const Z_INDEX = {
  header: 10,
  popup: 100,
  splash_screen: 1000,
};
