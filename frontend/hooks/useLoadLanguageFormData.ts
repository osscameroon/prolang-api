import { useRetrieveYearGroups } from '@hooks/request/query/useRetrieveYearGroups';
import { useRetrieveAllAuthors } from '@hooks/request/query/useRetrieveAllAuthors';
import { useRetrieveAllLanguages } from '@hooks/request/query/useRetrieveAllLanguages';

export const useLoadLanguageFormData = () => {
  const { data: yearGroupData, isLoading: isYearGroupLoading } = useRetrieveYearGroups({ cacheTime: 24 * 3600 });
  const { data: authorData, isLoading: isAuthorLoading } = useRetrieveAllAuthors({ cacheTime: 24 * 3600 });
  const { data: languageData, isLoading: isLanguageLoading } = useRetrieveAllLanguages({ cacheTime: 24 * 3600 });

  const isLoading = isAuthorLoading || isLanguageLoading || isYearGroupLoading;
  
  return { authorData, isLoading, languageData, yearGroupData };
};
