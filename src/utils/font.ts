import localFont from 'next/font/local';

export const handbuck = localFont({
  src: '../assets/fonts/handbuck/Handbuck.otf',
});
export const ollifiaPoettry = localFont({
  src: '../assets/fonts/ollifia-poettry/OllifiaPoettry.otf',
});

export const satoshi = localFont({
  src: [
    {
      path: '../assets/fonts/satoshi/Satoshi-Light.otf',
      style: 'light',
      weight: '300',
    },
    {
      path: '../assets/fonts/satoshi/Satoshi-Regular.otf',
      style: 'regular',
      weight: '400',
    },

    {
      path: '../assets/fonts/satoshi/Satoshi-Medium.otf',
      style: 'medium',
      weight: '500',
    },
    {
      path: '../assets/fonts/satoshi/Satoshi-Bold.otf',
      style: 'bold',
      weight: '600',
    },
  ],
});
