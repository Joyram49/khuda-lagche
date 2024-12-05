"use client";

import { Input } from "../ui/input";
import PaginatedItems from "./paginated-items";

const CustomPagination = ({
  itemsPerPage,
  handleItemsPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update state
  };

  return (
    <div className='flex flex-col lg:flex-row space-y-4 lg:justify-between items-center mt-6'>
      <div className='w-full max-w-sm flex items-center gap-x-2'>
        <p className='block text-nowrap'>Items per page: </p>
        <Input
          type='number'
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPage(e.target.value)}
          className='max-w-20'
        />
      </div>
      <PaginatedItems
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CustomPagination;
