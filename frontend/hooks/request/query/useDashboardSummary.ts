import { useQuery } from 'react-query';

import { usePrivateClient } from '@hooks/useAxios';
import { DashboardSummaryData } from '@typings/common';
import { QUERY_KEYS } from '@utils/constants';

export const useDashboardSummary = () => {
  const axiosInstance = usePrivateClient();

  return useQuery(QUERY_KEYS.dashboardSummary, async () => {
    const response = await axiosInstance.get<DashboardSummaryData>('stat/summary');

    return response.data.data;
  });
};
