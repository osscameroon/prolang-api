import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import { getInputErrorMessage } from '@utils/forms';

type FormInputProps = {
  label: string;
  isRequired?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const FormInput = (props: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { label, className, isRequired, ...inputProps } = props;
  const errorMessage = getInputErrorMessage(errors, inputProps.name);

  const inputClasses = classNames(
    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50',
    className,
  );

  return (
    <label className="block text-sm mb-6">
      <span className="font-bold text-gray-700 dark:text-gray-400">
        {label}
        {isRequired ? '*' : ''}
      </span>
      <input className={inputClasses} autoComplete="off" {...inputProps} {...(inputProps.name ? register(inputProps.name) : {})} />
      {errorMessage && <span className="text-xs text-red-600 dark:text-red-400">{errorMessage}</span>}
    </label>
  );
};

export { FormInput };
