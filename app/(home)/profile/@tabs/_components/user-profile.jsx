import { Mail, Phone, UserRoundPlus } from "lucide-react";

async function UserProfile({ user }) {
  const nameInArray = user?.name.split(" ");
  const lastName = nameInArray.splice(nameInArray.length - 1, 1).join("");
  const firstName = nameInArray.join(" ");
  return (
    <div className='flex flex-col gap-y-4 lg:gap-y-6 mt-6 font-robotoSlab'>
      <div className='border-[1px] border-slate-900/10 drop-shadow-sm rounded-sm p-4 '>
        <div className='grid sm:grid-rows-2 grid-flow-row sm:grid-flow-col gap-y-4'>
          <div className='flex justify-start items-center gap-x-2'>
            <UserRoundPlus className=' stroke-initial' size='20' />
            <span className='font-medium'>First Name : </span>
            <p className='capitalize'>{firstName}</p>
          </div>
          <div className='flex justify-start items-center gap-x-2'>
            <UserRoundPlus className=' stroke-initial' size='20' />
            <span className='font-medium'>Last Name : </span>
            <p className='capitalize'>{lastName}</p>
          </div>
          <div className='flex justify-start items-center gap-x-2'>
            <Phone className=' stroke-initial' size='20' />
            <span className='font-medium'>Mobile : </span>
            <p className='capitalize'>{user?.phone ?? "N/A"}</p>
          </div>
          <div className='flex justify-start items-center gap-x-2'>
            <Mail className=' stroke-initial' size='20' />
            <span className='font-medium'>Email : </span>
            <p className=''>{user?.email}</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-y-4'>
        <h1 className='font-medium'>Saved address</h1>
        <div className='border-[1px] border-slate-900/10 drop-shadow-sm rounded-sm p-4 '>
          {user.address ? (
            <p className=''>{user.address}</p>
          ) : (
            <p className='text-initial font-thin'>Address not added yet!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
