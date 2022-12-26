import DatePicker from 'react-datepicker';
import { Controller, useFormContext } from 'react-hook-form';

import { FormInput } from '@components/common/form-input';
import { Button } from '@components/common/button';

type Props = {
  isSubmitting?: boolean;
  isEditMode?: boolean;
};

const AuthorForm = ({ isEditMode = false, isSubmitting }: Props) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className="px-8 py-8 w-1/2 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="w-full">
        <FormInput label="Name" name="name" type="text" placeholder="Guido Van Rossum" isRequired />
      </div>

      <div className="w-full flex justify-between">
        <div className="wp-45">
          <FormInput label="Link to bio" name="link" type="text" placeholder="" />
        </div>
        <div className="wp-45">
          <FormInput label="Picture link" name="picture" type="text" placeholder="" />
        </div>
      </div>

      <div className="w-full flex justify-between">
        <div className="wp-45">
          <FormInput label="Country" name="country" type="text" placeholder="France" />
        </div>
        <div className="wp-45">
          <label className="block text-sm mb-6">
            <span className="font-bold text-gray-700 dark:text-gray-400 mb-1">Date of birth</span>
            <Controller
              name="birthDate"
              control={control}
              render={(field) => (
                // @ts-ignore
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={field.field.value}
                  onChange={field.field.onChange}
                  selectsEnd
                  startDate={new Date()}
                  nextMonthButtonLabel=">"
                  placeholderText="DD/MM/YYYY"
                  previousMonthButtonLabel="<"
                />
              )}
            />
            {errors.birthDate && <span className="text-xs text-red-600 dark:text-red-400">{errors.birthDate.message}</span>}
          </label>
        </div>
      </div>

      <div className="w-full mt-8 flex justify-end">
        <Button text={isEditMode ? 'Update' : 'Create'} loading={isSubmitting} />
      </div>
    </div>
  );
};

export { AuthorForm };
