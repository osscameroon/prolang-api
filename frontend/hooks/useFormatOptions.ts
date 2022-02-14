import { useMemo } from 'react';
import { Author, Language, YearGroup } from '@typings/common';
import { formatOptions } from '@utils/forms';

export const useFormatOptions = (authors: Author[], languages: Language[], yearGroups: YearGroup[]) => {
  const authorOptions = useMemo(() => formatOptions(authors), [authors]);
  const languageOptions = useMemo(() => formatOptions(languages), [languages]);
  const yearGroupOptions = useMemo(() => formatOptions(yearGroups), [yearGroups]);

  return [authorOptions, languageOptions, yearGroupOptions];
};
