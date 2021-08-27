import { Controller, useFormContext } from 'react-hook-form';

import { SelectInput } from '@components/common/select-input';
import { FormInput } from '@components/common/form-input';
import { Button } from '@components/common/button';
import { SelectOption } from '@typings/common';
import { YEAR_CONFIRMED_OPTION } from '@utils/constants';

type LanguageFormProps = {
  isSubmitting?: boolean;
  isEditMode?: boolean;
  yearGroupOptions: SelectOption[];
};

const LanguageForm = ({ isSubmitting, isEditMode = false, yearGroupOptions }: LanguageFormProps) => {
  const { control } = useFormContext();

  return (
    <div className="px-8 py-8 w-1/2 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="w-full">
        <label className="block text-sm mb-6">
          <span className="font-bold text-gray-700 dark:text-gray-400">Year's Group*</span>
          <Controller
            name="yearGroup"
            control={control}
            render={({ field }) => <SelectInput className="wp-45" options={yearGroupOptions} {...field} />}
          />
        </label>
      </div>
        
      <div className="w-full flex justify-between">
        <div className="wp-45">
          <FormInput label="Name" type="text" placeholder="Java" name="name" isRequired />
        </div>
        <div className="wp-45">
          <FormInput label="Link to bio" type="text" placeholder="" name="link" />
        </div>
      </div>

      <div className="w-full flex justify-between">
        <div className="wp-45">
          <FormInput label="Year of creation" type="text" placeholder="1995" name="years" isRequired />
        </div>
        <div className="wp-45">
          <label className="block text-sm mb-6">
            <span className="font-bold text-gray-700 dark:text-gray-400">Is year of creation confirmed</span>
            <Controller
              name="yearConfirmed"
              control={control}
              render={({ field }) => <SelectInput className="wp-45" options={YEAR_CONFIRMED_OPTION} {...field} />}
            />
          </label>
        </div>
      </div>

      <div className="w-full flex justify-between">
        <div className="wp-45">
          <FormInput label="Extra name" type="text" name="extraName" />
        </div>
        <div className="wp-45">
          <FormInput label="Extra link" type="text" name="extraLink" />
        </div>
      </div>

      <div className="w-full flex justify-between">
        <div className="wp-45">
          <FormInput label="Company creator" type="text" name="company" />
        </div>
      </div>

      <div className="w-full mt-8 flex justify-end">
        <Button text={isEditMode ? 'Update' : 'Create'} loading={isSubmitting} />
      </div>
    </div>
  );
};

export { LanguageForm };
