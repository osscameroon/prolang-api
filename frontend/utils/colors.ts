import { BgColorVariants } from '@typings/common';

const backgroundColors: Record<BgColorVariants, string> = {
  primary: 'bg-purple-600 active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple',
  red: 'bg-red-600 hover:bg-red-700 focus:shadow-outline-red',
  whiteGray: 'bg-white text-gray-700 hover:bg-gray-5 border-gray-300 focus:shadow-outline-gray',
};

export { backgroundColors };
