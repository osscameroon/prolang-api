import { PaginationChangeEventData } from '@typings/common';
import Paginate from '@components/pagination/paginate';

type PaginationProps = {
  itemPerPage: number;
  pageItems: number;
  totalItems: number;
  onPageChange: (page: PaginationChangeEventData) => void;
  currentPage: number;
};

const Pagination = ({ currentPage, itemPerPage, onPageChange, pageItems, totalItems }: PaginationProps) => {
  return (
    <div className="bg-white mt-6 px-4 py-3 flex items-center justify-between border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>

      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * itemPerPage + 1}</span> to{' '}
            <span className="font-medium">{(currentPage - 1) * itemPerPage + pageItems}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <Paginate
            currentPage={currentPage}
            pageLimit={itemPerPage}
            pageNeighbours={1}
            totalRecords={totalItems}
            onPageChanged={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export { Pagination };
