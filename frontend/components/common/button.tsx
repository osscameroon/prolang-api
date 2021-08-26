import classNames from 'classnames';
import { forwardRef, ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { BgColorVariants } from '@typings/common';
import { backgroundColors } from '@utils/colors';

type ButtonProps = {
  text: string;
  loading?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  bgColor?: BgColorVariants;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
  const { className, loading, text, textAlign = 'left', bgColor = 'primary', ...buttonProps } = props;
  const buttonClasses = classNames(
    'flex items-center px-4 py-2 text-sm font-medium leading-5 text-white border border-transparent rounded-lg transition-colors duration-150 focus:outline-none',
    className,
    backgroundColors[bgColor],
    {
      'cursor-not-allowed': Boolean(buttonProps.disabled),
      'justify-center': textAlign === 'center',
      'justify-end': textAlign === 'right',
      'justify-start': textAlign === 'left',
    },
  );

  return (
    <button className={buttonClasses} {...buttonProps} ref={ref}>
      {loading && (
        <svg
          className="animate-spin-fast -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {text}
    </button>
  );
});

export { Button };
