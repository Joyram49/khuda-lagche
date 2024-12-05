export default function TransparentSpinnerLoader() {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='relative w-12 h-12'>
        {/* Ripple effect circles */}
        <div className='absolute inset-0 rounded-full border-4 border-t-4 border-gray-200 border-solid animate-ripple'></div>
        <div className='absolute inset-0 rounded-full border-4 border-t-4 border-gray-200 border-solid animate-ripple delay-200'></div>
        <div className='absolute inset-0 rounded-full border-4 border-t-4 border-gray-200 border-solid animate-ripple delay-400'></div>
        <div className='absolute inset-0 rounded-full border-4 border-t-4 border-gray-200 border-solid animate-ripple delay-600'></div>

        {/* Pulse animation for the center */}
        <div className='absolute inset-0 flex justify-center items-center'>
          <svg
            className='w-6 h-6 animate-pulse'
            fill='none'
            stroke='gray'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 2L12 12L22 12'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </div>

      {/* Inline styles for keyframes */}
      <style jsx>{`
          @keyframes ripple {
            0% {
              transform: scale(0.5);
              opacity: 1;
            }
            50% {
              transform: scale(1.5);
              opacity: 0.4;
            }
            100% {
              transform: scale(0.5);
              opacity: 1;
            }
          }
  
          .animate-ripple {
            animation: ripple 2s ease-in-out infinite;
          }
  
          .delay-200 {
            animation-delay: 0.2s;
          }
          .delay-400 {
            animation-delay: 0.4s;
          }
          .delay-600 {
            animation-delay: 0.6s;
          }
        `}</style>
    </div>
  );
}
