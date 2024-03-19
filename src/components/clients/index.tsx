import { BeakerIcon } from '@heroicons/react/24/solid';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Row } from 'react-table';
import { toast } from 'react-toastify';
import Button from '../../common/components/button';
import { FullScreenLoader } from '../../common/components/full-screen-loader';
import { Table, TableColumn } from '../../common/components/table';
import { ClientDto } from './models';
import { useDeleteClient, useGetClient } from './service';

const Clients = () => {
  const { t } = useTranslation('clients');

  const tableColumns = useMemo<TableColumn<ClientDto>[]>(
    () => [
      {
        Header: t('first-name'),
        accessor: 'firstName',
        Cell: ({ row }) => {
          return (
            <div className="flex gap-6">
              <img src={row.original.avatar} alt="Avatar" className="rounded-full h-6 w-6" />
              <span className="text-gray-900 font-medium">{`${row.original.firstName} `}</span>
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
        Header: t('last-name'),
        accessor: 'lastName',
        Cell: ({ row }) => <span className="text-gray-500">{` ${row.original.lastName}`}</span>,
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
        Header: t('company-name'),
        accessor: 'companyName',
        Cell: ({ row }) => <span className="text-gray-500 font-medium">{`${row.original.companyName}`}</span>,
        headerStyle: {
          width: '25%',
          minWidth: '10rem',
        },
        cellStyle: {
          width: '25%',
          minWidth: '1.25rem',
        },
      },
      {
        Header: t('contact-details'),
        accessor: 'contactDetails',
        Cell: ({ row }) => <span className="text-gray-500 font-medium">{`${row.original.contactDetails}`}</span>,
        headerStyle: {
          width: '12%',
          minWidth: '1.25rem',
        },
        cellStyle: {
          width: '12%',
          minWidth: '1.25rem',
        },
      },
      {
        Header: t('email'),
        accessor: 'email',
        Cell: ({ row }) => <span className="text-gray-500 font-medium">{` ${row.original.email}`}</span>,
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
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [isColumnSelectOpen, setIsColumnSelectOpen] = useState(false);
  const [filteredColumns, setFilteredColumns] = useState(tableColumns);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { mutate: deleteClient } = useDeleteClient();

  const handleToggleColumnSelect = () => {
    setIsColumnSelectOpen(!isColumnSelectOpen);
  };

  const handleColumnCheckboxChange = (columnName: string) => {
    if (selectedColumns.includes(columnName)) {
      setSelectedColumns(
        selectedColumns.filter((column) => {
          return column !== columnName;
        }),
      );
    } else {
      setSelectedColumns([...selectedColumns, columnName]);
    }
  };

  useEffect(() => {
    if (selectedColumns.length !== 0) {
      setFilteredColumns(tableColumns.filter((column) => selectedColumns.includes(column.Header as string)));
    } else {
      setFilteredColumns(tableColumns);
    }
  }, [selectedColumns, tableColumns]);

  const handleNavigate = () => {
    navigate('./add-client');
  };

  const { data: clientsData } = useGetClient();

  const onEdit = (row: Row<ClientDto>) => {
    navigate('./edit-client', { state: { clientData: row.original } });
  };

  const onDelete = (row: Row<ClientDto>) => {
    deleteClient(row.original.id, {
      onSuccess: () => {
        toast.success(t('delete-success'));
      },
    });
  };

  return pathname.split('/').includes('add-client') || pathname.split('/').includes('edit-client') ? (
    <Outlet />
  ) : (
    <div className="bg-white  shadow-md px-5 py-5  rounded flex flex-col gap-6 items-center">
      <div className="relative left-72">
        <div className="flex gap-2 items-center">
          <BeakerIcon className="h-10 cursor-pointer " onClick={handleToggleColumnSelect} />
          <span>{t('filter')}</span>
          <Button
            type="submit"
            className="px-4"
            onClick={() => {
              handleNavigate();
            }}
          >
            {t('add-new')}
          </Button>
        </div>
        {isColumnSelectOpen && (
          <div className=" bg-blue-100 w-52 absolute p-4 shadow-md  z-10">
            {tableColumns.map((column) => (
              <div key={column.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={column.Header as string}
                  checked={selectedColumns.includes(column.Header as string)}
                  onChange={() => handleColumnCheckboxChange(column.Header as string)}
                  className="mr-2"
                />
                <label htmlFor={column.Header as string}>{column.Header as string}</label>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        {clientsData ? (
          <Table columns={filteredColumns} data={clientsData} onEdit={onEdit} onDelete={onDelete} />
        ) : (
          <FullScreenLoader />
        )}
      </div>
    </div>
  );
};

export default Clients;
