import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Table, TableColumn } from '../../common/components/table';
import { mockSalaries } from './mock';
import { salariesType } from './models';

const Salaries = () => {
  const { t } = useTranslation('salaries');
  const [filterText, setFilterText] = useState('');
  const tableColumns = useMemo<TableColumn<salariesType>[]>(
    () => [
      {
        Header: t('name'),
        accessor: 'fullName',
        Cell: ({ row }) => {
          return (
            <div className="flex gap-6">
              <img src={row.original.avatar} alt="Avatar" className="rounded-full h-6 w-6" />
              <span className="text-gray-900 font-medium">{`${row.original.fullName} `}</span>
            </div>
          );
        },
        headerStyle: {
          width: '25%',
          minWidth: '1.25rem',
        },
        cellStyle: {
          width: '25%',
          minWidth: '1.25rem',
        },
      },
      {
        Header: t('rank'),
        accessor: 'rank',
        Cell: ({ row }) => <span className="text-gray-500">{` ${row.original.rank}`}</span>,
        headerStyle: {
          width: '5%',
          minWidth: '1rem',
        },
        cellStyle: {
          width: '5%',
          minWidth: '1rem',
        },
      },
      {
        Header: t('experience'),
        accessor: 'experience',
        Cell: ({ row }) => <span className="text-gray-500 font-medium">{`${row.original.experience}`}</span>,
        headerStyle: {
          width: '25%',
          minWidth: '1rem',
        },
        cellStyle: {
          width: '25%',
          minWidth: '1.25rem',
        },
      },
      {
        Header: t('calculated-salary'),
        accessor: 'calculatedSalary',
        Cell: ({ row }) => <span className="text-gray-500 font-medium">{`${row.original.calculatedSalary}`}</span>,
        headerStyle: {
          width: '12%',
          minWidth: '12rem',
        },
        cellStyle: {
          width: '12%',
          minWidth: '11rem',
        },
      },
      {
        Header: t('date'),
        accessor: 'date',
        Cell: ({ row }) => <span className="text-gray-500 font-medium">{`${row.original.date}`}</span>,
        headerStyle: {
          width: '12%',
          minWidth: '1.25rem',
        },
        cellStyle: {
          width: '12%',
          minWidth: '1.25rem',
        },
      },
    ],
    [t],
  );
  const [selectedDue, setSelectedDue] = useState<string | null>('Quarterly');
  const salaryDue = ['Quarterly', 'Monthly', 'Yearly'];
  const handleSalaryDue = (due: string) => {
    setSelectedDue(due);
  };
  return (
    <div className="bg-white flex justify-center shadow-md py-5 ml-6 rounded ">
      <div className="flex flex-col items-end">
        <div className="flex gap-28">
          <div className="bg-blue-50 flex gap-2 h-12 items-center px-2 py-2 rounded-md">
            {salaryDue.map((due) => {
              return (
                <div
                  key={due}
                  onClick={() => handleSalaryDue(due)}
                  className={`cursor-pointer ${
                    selectedDue === due ? 'bg-white rounded-xl  transition-all duration-300' : ''
                  }  px-4 py-1 `}
                >
                  {due}
                </div>
              );
            })}
          </div>
          <div className="flex  relative">
            <input
              type="text"
              placeholder={`${t('search')}...`}
              className="rounded-md bg-blue-50 shadow-lg"
              onChange={(e) => {
                setFilterText(e.target.value);
              }}
            />
            <MagnifyingGlassIcon className="h-6 absolute top-3 right-2 text-gray-500" />
          </div>
        </div>
        <div className="mt-6">
          <Table columns={tableColumns} data={mockSalaries} filterText={filterText} />
        </div>
      </div>
    </div>
  );
};

export default Salaries;
