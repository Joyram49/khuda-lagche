"use client";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import EmptyDataOnTable from "@/components/empty-data-table";
import Portal from "@/components/portal";
import TablePagination from "@/components/table-pagination";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DeleteUserModal from "@/modal/delete-user-modal";
import { RestaurantsTableColumns } from "./restaurants-column";
import RestaurantsTableToolbar from "./restaurants-table-toolbar";

export function RestaurantsTable({ restaurants }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = React.useState(null);
  const [sortType, setSortType] = React.useState("");

  const handleDeleteModal = (restaurantInfo) => {
    setSelectedRestaurant(restaurantInfo);
    setIsDeleteModalOpen(true);
  };

  const handleEditModal = (restaurantInfo) => {
    setSelectedRestaurant(restaurantInfo);
    setIsEditModalOpen(true);
  };

  const sortRestaurants = (restaurants, sortType) => {
    switch (sortType) {
      case "Top Favourite":
        return [...restaurants].sort(
          (a, b) => (b.favouriteCount || 0) - (a.favouriteCount || 0)
        );
      case "Most Sales":
        return [...restaurants].sort(
          (a, b) => (b.orders?.length || 0) - (a.orders?.length || 0)
        );
      case "Popular":
        return [...restaurants].sort((a, b) => {
          const avgRatingA =
            a.reviews?.reduce((acc, review) => acc + review.rating, 0) /
            (a.reviews?.length || 1);
          const avgRatingB =
            b.reviews?.reduce((acc, review) => acc + review.rating, 0) /
            (b.reviews?.length || 1);
          return avgRatingB - avgRatingA;
        });
      default:
        return restaurants;
    }
  };

  const columns = RestaurantsTableColumns({ handleDeleteModal });

  const sortedRestaurants = React.useMemo(() => {
    return sortRestaurants(restaurants, sortType);
  }, [restaurants, sortType]);

  const table = useReactTable({
    data: sortedRestaurants,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <>
      <div className='w-full  '>
        {/* Restaurant heading with short description */}
        <div className='flex flex-col space-y-2 py-6 font-robotoSlab text-[#414548]'>
          <div className='flex  gap-x-2'>
            <h1 className='text-foreground font-medium text-2xl'>
              Total Restaurants
            </h1>
            <Badge>{restaurants?.length}</Badge>
          </div>
          <p className='text-initial font-inter text-sm'>
            Manage restaurants that are connected with your website.{" "}
          </p>
        </div>
        {/* top filter & sorting section  */}
        <RestaurantsTableToolbar
          table={table}
          sortType={sortType}
          setSortType={setSortType}
        />

        {/* data table */}
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            {restaurants?.length > 0 ? (
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className='h-24 text-center'
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            ) : (
              <EmptyDataOnTable type='restaurants' />
            )}
          </Table>
        </div>

        {/* footer with  next & prev pagination button */}
        <TablePagination table={table} type='restaurants' />
      </div>

      {isDeleteModalOpen && (
        <Portal>
          <DeleteUserModal onClose={() => setIsDeleteModalOpen(false)} />
        </Portal>
      )}
    </>
  );
}
