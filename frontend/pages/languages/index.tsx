import { ChangeEvent, useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { FilterQueryParams, PaginationChangeEventData, SelectOption } from '@typings/common';
import { withPrivateLayout } from '@components/hof/with-private-layout';
import { Pagination } from '@components/pagination/pagination';
import { SelectInput } from '@components/common/select-input';
import { ConfirmDialog } from '@components/common/confirm-dialog';
import { TableNoRow } from '@components/common/table-no-row';
import { TableRowHeader } from '@components/common/table-row-header';
import { LanguageRow } from '@components/languages/language-row';
import { PageHeader } from '@components/common/page-header';
import { useBooleanState } from '@hooks/useBooleanState';
import { useRetrieveLanguages } from '@hooks/request/query/useRetrieveLanguages';
import { useRetrieveYearGroups } from '@hooks/request/query/useRetrieveYearGroups';
import { useDeleteLanguage } from '@hooks/request/mutation/useDeleteLanguage';
import {
  DEFAULT_YEAR_GROUP,
  LANGUAGE_DELETED_MESSAGE,
  NETWORK_ERROR_MESSAGE
} from '@utils/constants';
import { formatYearGroupOption } from '@utils/forms';
import { getErrorMessage } from '@utils/axios';

type LanguageSearchParams = FilterQueryParams & {
  yearGroup: SelectOption;
};

const Languages = () => {
  const [isDialogOpen, openDialog, closeDialog] = useBooleanState(false);
  const [selectedId, setSelectedId] = useState<string | null>();
  const [searchParams, setSearchParams] = useState<LanguageSearchParams>({
    page: 1,
    search: undefined,
    yearGroup: DEFAULT_YEAR_GROUP,
  });

  const deleteMutation = useDeleteLanguage();
  const { data: yearGroupListData } = useRetrieveYearGroups();
  
  const { data, refetch } = useRetrieveLanguages(
    {
      name: searchParams.yearGroup?.value,
      page: searchParams.page,
      search: searchParams.search,
    },
    { keepPreviousData: true, refetchOnWindowFocus: false },
  );

  const onDeleteLanguageClick = (id: string) => {
    setSelectedId(id);
    openDialog();
  };

  const handleDeleteLanguageClick = async () => {
    if (!selectedId) {
      return;
    }

    deleteMutation.mutate(selectedId, {
      onError: (error) => {
        closeDialog();
        toast.error(getErrorMessage(error) || NETWORK_ERROR_MESSAGE);
      },
      onSuccess: async () => {
        await refetch();
        closeDialog();
        toast.success(LANGUAGE_DELETED_MESSAGE);
      },
    });
  };

  const handleYearGroupChange = (value: SelectOption) => {
    setSearchParams((prevValue) => ({
      ...prevValue,
      page: 1,
      yearGroup: value,
    }));
  };

  const handleSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prevValue) => ({
      ...prevValue,
      page: 1,
      search: event.target.value,
    }));
  };

  const onPaginationChange = async (eventData: PaginationChangeEventData) => {
    setSearchParams((prevValue) => ({
      ...prevValue,
      page: eventData.currentPage,
    }));
  };

  return (
    <>
      <div className="container px-6 mx-auto grid">
        <PageHeader text="Languages List" />
        <div className="flex flex-col">
          <div className="py-4 flex justify-between">
            <div className="flex w-auto">
              <div className="relative mr-6 text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <input
                  className="block w-full pl-10 mt-1 text-sm text-black border-gray-300 shadow-sm rounded-md focus:border-purple-400 focus:outline-none focus:shadow-outline-purple"
                  placeholder="Jane Doe"
                  type="search"
                  value={searchParams.search}
                  onChange={handleSearchChange}
                />
                <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                  <SearchIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              <SelectInput
                options={formatYearGroupOption(yearGroupListData || [])}
                value={searchParams.yearGroup}
                onChange={handleYearGroupChange}
              />
            </div>

            <Link href="/languages/new">
              <a className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                <span className="mr-2" aria-hidden="true">
                  <PlusIcon className="w-5 h-5" />
                </span>
                  New language
              </a>
            </Link>
          </div>
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <TableRowHeader name="Name" />
                      <TableRowHeader name="Year of creation" />
                      <TableRowHeader name="Author" />
                      <TableRowHeader name="Company" />
                      <TableRowHeader name="Predecessors" />
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Boolean(data?.items.length) &&
                    data?.items.map((item) => (
                      <LanguageRow
                        key={item.id}
                        item={item} triggerDeleteDialog={() => onDeleteLanguageClick(item.id)}
                      />
                    ))}

                    {!Boolean(data?.items.length) && <TableNoRow colSpan={7} />}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {data?.items && data?.items.length > 0 && (
            <Pagination
              currentPage={searchParams.page}
              itemPerPage={data.limit}
              pageItems={data.totalPages}
              totalItems={data.totalItems}
              onPageChange={onPaginationChange}
            />
          )}
        </div>
      </div>
      <ConfirmDialog
        isLoading={false}
        open={isDialogOpen}
        onConfirmButtonClick={handleDeleteLanguageClick}
        onCancelButtonClick={closeDialog}
      />
    </>
  );
};

export default withPrivateLayout(Languages);
