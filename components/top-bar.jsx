import { Headset, MapPin } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

function TopBar() {
  return (
    <div className='container flex justify-between items-center py-1'>
      <div className='flex gap-x-6 flex-col md:flex-row items-center'>
        <p className='text-initial text-[13px] font-roboto'>
          Call us for Ordering
        </p>
        <div className='flex justify-center items-center gap-x-2'>
          <Headset className='text-customYellow' strokeWidth={2.5} size={20} />
          <p className='font-medium text-deepInitial'>223-334-444</p>
        </div>
      </div>
      <div className='flex justify-center items-center gap-x-4 flex-col md:flex-row'>
        <div className=' flex  justify-center items-center gap-x-2 text-initial text-sm relative '>
          <MapPin className='text-initial ' size={18} />
          <p className='text-[13px]'>Location</p>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
}

export default TopBar;
