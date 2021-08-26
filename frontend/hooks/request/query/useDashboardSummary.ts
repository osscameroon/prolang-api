import { useQuery } from 'react-query';

import { useAxios } from '@hooks/useAxios';
import { DashboardSummaryData } from '@typings/common';
import { QUERY_KEYS } from '@utils/constants';

export const useDashboardSummary = () => {
  const axiosInstance = useAxios();

  return useQuery(QUERY_KEYS.dashboardSummary, async () => {
    const response = await axiosInstance.get<DashboardSummaryData>('stats/summary');

    return response.data.data;
  });
};
