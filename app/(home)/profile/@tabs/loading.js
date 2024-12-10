"use client";
export default function LoadingProfile() {
  return (
    <div className='flex items-center justify-center h-screen bg-backgroundF'>
      {/* Beautiful Loader */}
      <div className='animate-spin rounded-full h-24 w-24 border-t-4 border-yellow-500 border-b-4 '></div>
    </div>
  );
}
