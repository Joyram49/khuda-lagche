import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function UsersTableSkeleton() {
  return (
    <div className='w-full'>
      {/* Toolbar Skeleton */}
      <div className='animate-pulse mb-4 space-y-2'>
        <div className='h-4 bg-gray-300 rounded-md w-1/4'></div>
        <div className='h-4 bg-gray-300 rounded-md w-1/3'></div>
      </div>

      {/* Table Skeleton */}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              {Array(6)
                .fill(null)
                .map((_, index) => (
                  <TableHead key={index}>
                    <div className='h-4 bg-gray-300 rounded-md w-3/4 mx-auto'></div>
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(5)
              .fill(null)
              .map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array(6)
                    .fill(null)
                    .map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <div className='h-4 bg-gray-300 rounded-md w-3/4 mx-auto'></div>
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Skeleton */}
      <div className='animate-pulse mt-4 flex items-center justify-between'>
        <div className='h-8 bg-gray-300 rounded-md w-16'></div>
        <div className='flex gap-2'>
          <div className='h-8 bg-gray-300 rounded-md w-8'></div>
          <div className='h-8 bg-gray-300 rounded-md w-8'></div>
        </div>
      </div>
    </div>
  );
}

export default UsersTableSkeleton;
