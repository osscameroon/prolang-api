import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type ImgProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const Img = (props: ImgProps) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt="picture" {...props} />
  );
};

export { Img };
