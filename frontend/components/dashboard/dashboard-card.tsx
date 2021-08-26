import { PropsWithChildren } from 'react';

type DashboardCardProps = {
  color: string;
  label: string;
  value: string;
};

const DashboardCard = ({ children, color, label, value }: PropsWithChildren<DashboardCardProps>) => {
  const classNames = `p-3 mr-4 text-${color}-500 bg-${color}-100 rounded-full dark:text-${color}-100 dark:bg-${color}-500`;

  return (
    <div className="flex items-center p-4 bg-white border rounded-lg shadow-xs dark:bg-gray-800">
      <div className={classNames}>{children}</div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{value}</p>
      </div>
    </div>
  );
};

export { DashboardCard };
