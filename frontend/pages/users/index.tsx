import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { PlusIcon } from '@heroicons/react/outline';

import { withPrivateLayout } from '@components/hof/with-private-layout';
import { ConfirmDialog } from '@components/common/confirm-dialog';
import { Loader } from '@components/common/loader';
import { UserRow } from '@components/users/user-row';
import { TableNoRow } from '@components/common/table-no-row';
import { TableRowHeader } from '@components/common/table-row-header';
import { useBooleanState } from '@hooks/useBooleanState';
import { useRetrieveUsers } from '@hooks/request/query/useRetrieveUsers';
import { USER_DELETED_MESSAGE } from '@utils/constants';
import { PageHeader } from '@components/common/page-header';
import { useAuth } from '@hooks/useAuth';

const Users = () => {
  const { user } = useAuth();
  const [isDialogOpen, openDialog, closeDialog] = useBooleanState(false);
  const [selectedId, setSelectedId] = useState<string | null>();

  const { data, isLoading, refetch } = useRetrieveUsers();

  if (isLoading) {
    return <Loader />;
  }

  const onDeleteUserClick = (plannerId: string) => {
    setSelectedId(plannerId);
    openDialog();
  };

  const handleDeleteUserClick = async () => {
    if (!selectedId) {
      return;
    }

    await refetch();
    closeDialog();
    toast.success(USER_DELETED_MESSAGE);
  };

  return (
    <>
      <div className="container px-6 mx-auto grid">
        <PageHeader text="Users List" />

        <div className="flex flex-col">
          <div className="py-4 flex justify-end">
            <Link href="/users/new">
              <a className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                <span className="mr-2" aria-hidden="true">
                  <PlusIcon className="w-5 h-5" />
                </span>
                  New user
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
                      <TableRowHeader name="Email" />
                      <TableRowHeader name="Role" />
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Boolean(data?.length) &&
                    data?.map((item) => (
                      <UserRow
                        key={item.id}
                        item={item}
                        triggerDeleteDialog={() => onDeleteUserClick(item.id)}
                        canEdit={true}
                        canDelete={user?.role === 'admin'}
                      />
                    ))}

                    {!Boolean(data?.length) && <TableNoRow colSpan={5} />}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog
        isLoading={false}
        open={isDialogOpen}
        onConfirmButtonClick={handleDeleteUserClick}
        onCancelButtonClick={closeDialog}
      />
    </>
  );
};

export default withPrivateLayout(Users);