import { SelectOption, YearGroup } from '@typings/common';
import { DEFAULT_YEAR_GROUP } from '@utils/constants';

export const getInputErrorMessage = (formErrors: Record<string, any>, inputName?: string) => {
  if (!inputName) {
    return;
  }

  if (inputName in formErrors) {
    return formErrors[inputName].message;
  }
};

export const formatYearGroupOption = (yearGroups: YearGroup[]) => {
  const yearGroupOptions = yearGroups.map(
    (yearGroup): SelectOption => ({ label: yearGroup.name, value: yearGroup.name })
  );
  
  return [DEFAULT_YEAR_GROUP].concat(yearGroupOptions);
};
