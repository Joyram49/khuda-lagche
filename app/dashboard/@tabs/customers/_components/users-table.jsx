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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteUserModal from "@/modal/delete-user-modal";
import { UsersTableColumns } from "./users-table-columns";
import UsersTableToolbar from "./users-table-toolbar";

function UsersTable({ users }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [sortType, setSortType] = React.useState("");

  const handleDeleteModal = (userInfo) => {
    setSelectedUser(userInfo);
    setIsDeleteModalOpen(true);
  };

  const handleViewModal = (userInfo) => {
    setSelectedUser(userInfo);
    setIsViewModalOpen(true);
  };

  const sortUsers = (users, sortType) => {
    switch (sortType) {
      case "customer":
        return [...users].filter((user) => user.role === "customer");
      case "vendor":
        return [...users].filter((user) => user.role === "vendor");
      default:
        return users;
    }
  };

  const columns = UsersTableColumns({ handleDeleteModal, handleViewModal });

  const sortedUsers = React.useMemo(() => {
    return sortUsers(users, sortType);
  }, [users, sortType]);

  const table = useReactTable({
    data: sortedUsers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <>
      <div className='w-full  '>
        {/* top filter & sorting section  */}
        <UsersTableToolbar
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
            {users?.length > 0 ? (
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
              <EmptyDataOnTable type='users' />
            )}
          </Table>
        </div>

        {/* footer with  next & prev pagination button */}
        <TablePagination table={table} type='users' />
      </div>

      {isDeleteModalOpen && (
        <Portal>
          <DeleteUserModal onClose={() => setIsDeleteModalOpen(false)} />
        </Portal>
      )}
    </>
  );
}

export default UsersTable;
