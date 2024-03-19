import { ArchiveBoxIcon, CubeIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import SalaryDeatails from './components/salary-details-box/index';

const Dashboard = () => {
  const { t } = useTranslation();
  const details = useMemo(
    () => [
      {
        icon: <CubeIcon />,
        className: 'bg-blue-50 text-green-500',
        salaryInfo: t('salary-due'),
        time: t('weekly'),
        amount: '1368',
      },
      {
        icon: <UserIcon />,
        className: 'bg-blue-100 text-blue-500',
        salaryInfo: t('salary-paid'),
        time: t('monthly'),
        amount: '1368',
      },
      {
        icon: <ArchiveBoxIcon />,
        className: 'bg-blue-50 text-yellow-500',
        salaryInfo: t('salary-paid'),
        time: t('quarterly'),
        amount: '1368',
      },
      {
        icon: <ShoppingCartIcon />,
        className: 'bg-blue-100 text-purple-500',
        salaryInfo: t('salary-paid'),
        time: t('year'),
        amount: '1368',
      },
    ],
    [t],
  );
  return (
    <>
      <div className="flex gap-8">
        {details.map(({ salaryInfo, icon, amount, time, className }) => {
          return (
            <SalaryDeatails
              salaryInfo={salaryInfo}
              icon={icon}
              time={time}
              amount={amount}
              className={className}
              key={salaryInfo}
            />
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
