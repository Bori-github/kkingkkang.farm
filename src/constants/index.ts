import { GRAY_300, SECONDARY, WHITE } from './colors';

export const API_ENDPOINT = 'https://api.mandarin.cf';
// export const API_ENDPOINT = 'http://146.56.183.55:5050';

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
