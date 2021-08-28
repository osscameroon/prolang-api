import { ChangeEvent, useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { UserAddIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { FilterQueryParams, PaginationChangeEventData } from '@typings/common';
import { withPrivateLayout } from '@components/hof/with-private-layout';
import { Pagination } from '@components/pagination/pagination';
import { ConfirmDialog } from '@components/common/confirm-dialog';
import { TableNoRow } from '@components/common/table-no-row';
import { TableRowHeader } from '@components/common/table-row-header';
import { PageHeader } from '@components/common/page-header';
import { useBooleanState } from '@hooks/useBooleanState';
import {
  AUTHOR_DELETED_MESSAGE,
  NETWORK_ERROR_MESSAGE
} from '@utils/constants';
import { useRetrieveAuthors } from '@hooks/request/query/useRetrieveAuthors';
import { AuthorRow } from '@components/authors/author-row';
import { useDeleteAuthor } from '@hooks/request/mutation/useDeleteAuthor';
import { getErrorMessage } from '@utils/axios';

const Authors = () => {
  const [isDialogOpen, openDialog, closeDialog] = useBooleanState(false);
  const [selectedId, setSelectedId] = useState<string | null>();
  const [searchParams, setSearchParams] = useState<FilterQueryParams>({
    page: 1,
    search: '',
  });

  const deleteMutation = useDeleteAuthor();
  const { data, refetch } = useRetrieveAuthors(
    {
      page: searchParams.page,
      search: searchParams.search,
    },
    { keepPreviousData: true, refetchOnWindowFocus: false },
  );

  const onDeleteAuthorClick = (id: string) => {
    setSelectedId(id);
    openDialog();
  };

  const handleDeleteAuthorClick = () => {
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
        toast.success(AUTHOR_DELETED_MESSAGE);
      },
    });
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
        <PageHeader text="Authors List" />
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
            </div>

            <Link href="/authors/new">
              <a className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                <span className="mr-2" aria-hidden="true">
                  <UserAddIcon className="w-5 h-5" />
                </span>
                  New author
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
                      <TableRowHeader name="Birth Date" />
                      <TableRowHeader name="Country" />
                      <TableRowHeader name="Link" />
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Boolean(data?.items.length) &&
                    data?.items.map((item) => (
                      <AuthorRow key={item.id} item={item} triggerDeleteDialog={() => onDeleteAuthorClick(item.id)} />
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
        onConfirmButtonClick={handleDeleteAuthorClick}
        onCancelButtonClick={closeDialog}
      />
    </>
  );
};

export default withPrivateLayout(Authors);
