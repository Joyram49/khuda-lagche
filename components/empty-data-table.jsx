import EmptyImg from "@/public/assets/empty.webp";
import Image from "next/image";
import { TableBody, TableCell, TableRow } from "./ui/table";

function EmptyDataOnTable({ type }) {
  return (
    <TableBody className='text-center  text-[#414549] font-medium '>
      <TableRow>
        <TableCell colSpan={6}>
          <div className='w-full min-h-[50vh] flex flex-col justify-center items-center '>
            <Image src={EmptyImg} alt='empty box' />
            <p>
              There is no {type} available at this moment. Please come back
              again.
            </p>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export default EmptyDataOnTable;
