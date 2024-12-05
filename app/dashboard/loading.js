export default function DashboardLoadingPage() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-transparent to-gray-300'>
      {/* Transparent Overlay */}
      <div className='absolute inset-0 bg-transparent opacity-20 z-10' />

      {/* Spinner */}
      <div className='relative z-20 flex flex-col justify-center items-center'>
        <div className='w-12 h-12 border-4 border-t-4 border-white border-t-yellow-400 rounded-full animate-spin'></div>
        <p className='mt-4 text-white text-lg font-semibold'>Loading...</p>
      </div>
    </div>
  );
}
