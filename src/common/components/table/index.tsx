import { ChevronLeftIcon, ChevronRightIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Column, Row, useGlobalFilter, useRowSelect, useSortBy, useTable } from 'react-table';

import { FullScreenLoader } from '../full-screen-loader';

export type TableColumn<T extends object> = {
  headerStyle?: object;
  cellStyle?: object;
  cellClassName?: string;
} & Column<T>;

type TableProps<T extends object> = {
  columns: TableColumn<T>[];
  data: T[];
  showPagination?: boolean;
  showSelection?: boolean;
  isLoading?: boolean;
  header?: React.ReactNode;
  onRowClick?: (row: Row<T>) => void;
  onEdit?: (row: Row<T>) => void;
  onDelete?: (row: Row<T>) => void;
  filterText?: string;
};

function Table<T extends object = object>({
  columns,
  data,
  showPagination,
  showSelection,
  isLoading,
  header,
  onRowClick,
  onDelete,
  onEdit,
  filterText,
}: TableProps<T>) {
  const { t } = useTranslation();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [offsetData, setOffsetData] = useState<T[]>([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeRow, setActiveRow] = useState<Row<T> | null>(null);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter } = useTable(
    {
      columns,
      data: useMemo(() => offsetData || [], [offsetData]),
    },
    useGlobalFilter,
    useSortBy,
    useRowSelect,

    (hooks) => {
      showSelection &&
        hooks.visibleColumns.push((columns) => [
          {
            id: 'selection',
            headerStyle: {
              maxWidth: '1rem',
              minWidth: '1rem',
              width: '1rem',
            },
            cellStyle: {
              maxWidth: '1rem',
              minWidth: '1rem',
              width: '1rem',
            },
          },
          ...columns,
        ]);
    },
  );

  const pageOffset = useMemo(() => 10, []);

  useEffect(() => {
    if (data && data.length > 0) {
      setTotalPages(Math.ceil(data.length / pageOffset));
    }
  }, [data, pageOffset]);

  useEffect(() => {
    if (data && data.length > 0) {
      setOffsetData(data.slice(currentPage * pageOffset, currentPage * pageOffset + pageOffset));
    }
  }, [currentPage, data, pageOffset]);

  const paginationRange = useCallback(() => {
    const stepSize = 2;
    let start = currentPage - stepSize;
    let end = currentPage + stepSize + 1;

    if (end > totalPages) {
      start -= end - totalPages;
      end = totalPages;
    }

    if (start < 0) {
      end += -start;
      start = 0;
    }

    end = Math.min(end, totalPages);

    return [...Array(end - start)].map((_, i) => start + i);
  }, [currentPage, totalPages]);

  useEffect(() => {
    setGlobalFilter(filterText);
  }, [filterText, setGlobalFilter]);

  return (
    <div className="flex flex-col items-end">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow md:rounded-lg">
            {header}
            <table className=" bg-blue-50" {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-sm font-semibold text-gray-900"
                        {...column.getHeaderProps([
                          {
                            style: (column as any).headerStyle,
                          },
                          column.getSortByToggleProps(),
                        ])}
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className=" bg-white" {...getTableBodyProps()}>
                {data && data.length === 0 && (
                  <tr>
                    <td colSpan={columns.length + (showSelection ? 1 : 0)}>
                      <div className="flex flex-1 flex-col justify-center items-center p-10">
                        <span className="text-sm text-gray-900 font-medium mt-2">{t('no-data')}</span>
                      </div>
                    </td>
                  </tr>
                )}
                {isLoading && (
                  <tr className="h-96">
                    <td colSpan={columns.length + (showSelection ? 1 : 0)}>
                      <FullScreenLoader />
                    </td>
                  </tr>
                )}
                {!!data &&
                  !isLoading &&
                  rows.map((row) => {
                    prepareRow(row);
                    return (
                      <React.Fragment key={row.id}>
                        <tr
                          {...row.getRowProps()}
                          onClick={() => {
                            onRowClick?.(row);
                            setActiveRow(row);
                          }}
                          className={classNames(!!onRowClick && 'cursor-pointer flex items-center ')}
                        >
                          {row.cells.map((cell) => (
                            <td
                              className="whitespace-nowrap px-4 py-4 text-sm text-gray-800 "
                              {...cell.getCellProps([
                                {
                                  style: (cell.column as any).cellStyle,
                                },
                              ])}
                            >
                              {cell.render('Cell')}
                            </td>
                          ))}
                          <td className="relative ">
                            <EllipsisVerticalIcon
                              className="h-5 mt-6 cursor-pointer"
                              onClick={(e) => {
                                setActiveRow(row);
                                setIsDropdownOpen(!isDropdownOpen);
                              }}
                            />
                            {isDropdownOpen && activeRow && activeRow.id === row.id && (
                              <div className="absolute z-10 right-6 mt-2  w-36 rounded-md shadow-lg bg-blue-100 ">
                                <div className="py-1">
                                  <button
                                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => onEdit?.(row)}
                                  >
                                    {t('edit')}
                                  </button>
                                  <button
                                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => onDelete?.(row)}
                                  >
                                    {t('delete')}
                                  </button>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
              </tbody>
            </table>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                {currentPage > 0 && (
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                )}
                {currentPage < totalPages - 1 && (
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </button>
                )}
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{' '}
                    <span className="font-medium">{offsetData.length > 0 ? currentPage * pageOffset + 1 : 0}</span> to{' '}
                    <span className="font-medium">
                      {offsetData.length < 10
                        ? currentPage * pageOffset + offsetData.length
                        : currentPage * pageOffset + pageOffset}
                    </span>{' '}
                    of <span className="font-medium">{data && data.length}</span> results
                  </p>
                </div>
                <div>
                  {data && data.length > pageOffset && (
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      {currentPage > 0 && (
                        <button
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                        >
                          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      )}
                      {paginationRange().map((page) => (
                        <React.Fragment key={page}>
                          {page === currentPage ? (
                            <button
                              aria-current="page"
                              className="relative z-10 inline-flex items-center border border-blue-500 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 focus:z-20"
                            >
                              {page + 1}
                            </button>
                          ) : (
                            <button
                              onClick={() => setCurrentPage(page)}
                              className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                              {page + 1}
                            </button>
                          )}
                        </React.Fragment>
                      ))}
                      {currentPage < totalPages - 1 && (
                        <button
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                        >
                          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      )}
                    </nav>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Table };
