import { Fragment } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

import { PaginationChangeEventData } from '@typings/common';
import classNames from 'classnames';

type PaginateProps = {
  totalRecords: number;
  pageLimit: number;
  pageNeighbours: number;
  onPageChanged: (page: PaginationChangeEventData) => void;
  currentPage: number;
};
const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from: number, to: number, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

/**
 * Let's say we have 10 pages and we set pageNeighbours to 2
 * Given that the current page is 6
 * The pagination control will look like the following:
 *
 * (1) < {4 5} [6] {7 8} > (10)
 *
 * (x) => terminal pages: first and last page(always visible)
 * [x] => represents current page
 * {...x} => represents page neighbours
 */
const fetchPageNumbers = (totalPages: number, currentPage: number, pageNeighbours: number) => {
  /**
   * totalNumbers: the total page numbers to show on the control
   * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
   */
  const totalNumbers = pageNeighbours * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

    let pages: Array<string | number> = range(startPage, endPage);

    /**
     * hasLeftSpill: has hidden pages to the left
     * hasRightSpill: has hidden pages to the right
     * spillOffset: number of hidden pages either to the left or to the right
     */
    const hasLeftSpill = startPage > 2;
    const hasRightSpill = totalPages - endPage > 1;
    const spillOffset = totalNumbers - (pages.length + 1);

    switch (true) {
      // handle: (1) < {5 6} [7] {8 9} (10)
      case hasLeftSpill && !hasRightSpill: {
        const extraPages = range(startPage - spillOffset, startPage - 1);

        pages = [LEFT_PAGE, ...extraPages, ...pages];
        break;
      }

      // handle: (1) {2 3} [4] {5 6} > (10)
      case !hasLeftSpill && hasRightSpill: {
        const extraPages = range(endPage + 1, endPage + spillOffset);

        pages = [...pages, ...extraPages, RIGHT_PAGE];
        break;
      }

      // handle: (1) < {4 5} [6] {7 8} > (10)
      case hasLeftSpill && hasRightSpill:
      default: {
        pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
        break;
      }
    }

    return [1, ...pages, totalPages];
  }

  return range(1, totalPages);
};

/**
 * @see https://www.digitalocean.com/community/tutorials/how-to-build-custom-pagination-with-react
 */
const Paginate = ({
  currentPage = 1,
  onPageChanged,
  pageLimit = 30,
  pageNeighbours = 0,
  totalRecords = 0,
}: PaginateProps) => {
  // pageNeighbours can be: 0, 1 or 2
  const pageNeighboursValue = Math.max(0, Math.min(pageNeighbours, 2));

  const totalPages = Math.ceil(totalRecords / pageLimit);

  const gotoPage = (page: number) => {
    const currentPage = Math.max(0, Math.min(page, totalPages));

    const paginationData: PaginationChangeEventData = {
      currentPage,
      pageLimit,
      totalPages,
      totalRecords,
    };

    onPageChanged(paginationData);
  };

  const handleClick = (page: number | string) => (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    gotoPage(page as number);
  };

  const handleMoveLeft = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    gotoPage(currentPage - pageNeighboursValue * 2 - 1);
  };

  const handleMoveRight = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    gotoPage(currentPage + pageNeighboursValue * 2 + 1);
  };

  if (!totalRecords || totalPages === 1) {
    return null;
  }

  const pages = fetchPageNumbers(totalPages, currentPage, pageNeighboursValue);

  const mainClasses = 'hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium';
  const defaultClasses = 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50';

  const arrowClasses = classNames(mainClasses, defaultClasses);

  const pageClasses = (pageIndex: number, pageNumber: number, maxPages: number) => {
    return classNames(mainClasses, {
      'bg-indigo-50 border-indigo-500 text-indigo-600 z-10': currentPage === pageNumber,
      [defaultClasses]: currentPage != pageNumber,
      'rounded-l-md': pageIndex === 0,
      'rounded-r-md': pageIndex === maxPages - 1,
    });
  };

  return (
    <Fragment>
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        {pages.map((page, index) => {
          if (page === LEFT_PAGE) {
            return (
              <a key={index} onClick={handleMoveLeft} href="#" className={arrowClasses}>
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            );
          }

          if (page === RIGHT_PAGE) {
            return (
              <a key={index} href="#" onClick={handleMoveRight} className={arrowClasses}>
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            );
          }

          return (
            <a key={index} href="#" onClick={handleClick(page)} className={pageClasses(index, +page, pages.length)}>
              {page}
            </a>
          );
        })}
      </nav>
    </Fragment>
  );
};

export default Paginate;
