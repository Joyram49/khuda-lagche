function CheckoutLoadingPage() {
  return (
    <div className='container mx-auto px-4 lg:px-10 py-6'>
      {/* Main grid layout */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
        {/* Left Section: Address & Payment */}
        <div className='flex flex-col space-y-6 lg:col-span-8'>
          {/* Personal Details */}
          <div className='bg-white border border-gray-200 rounded-md p-6 animate-pulse'>
            <div className='h-6 bg-gray-300 rounded w-1/4 mb-4'></div>
            <div className='flex justify-start items-start gap-x-4'>
              <div className='h-10 w-10 bg-gray-300 rounded-full'></div>
              <div className='flex flex-col space-y-2 w-full'>
                <div className='h-4 bg-gray-300 rounded w-1/3'></div>
                <div className='h-4 bg-gray-300 rounded w-1/2'></div>
                <div className='h-4 bg-gray-300 rounded w-1/4'></div>
              </div>
            </div>
          </div>
          {/* Delivery Address Section */}
          <div className='bg-white border border-gray-200 rounded-md p-6 animate-pulse'>
            <div className='h-6 bg-gray-300 rounded w-1/4 mb-4'></div>
            <div className='flex justify-start items-start gap-x-4'>
              <div className='h-10 w-10 bg-gray-300 rounded-full'></div>
              <div className='flex flex-col space-y-2 w-full'>
                <div className='h-4 bg-gray-300 rounded w-1/3'></div>
                <div className='h-4 bg-gray-300 rounded w-2/3'></div>
              </div>
            </div>
          </div>
          {/* Billing Address */}
          <div className='bg-white border border-gray-200 rounded-md p-6 animate-pulse'>
            <div className='h-6 bg-gray-300 rounded w-1/4 mb-4'></div>
            <div className='flex justify-start items-start gap-x-4'>
              <div className='h-10 w-10 bg-gray-300 rounded-full'></div>
              <div className='flex flex-col space-y-2 w-full'>
                <div className='h-4 bg-gray-300 rounded w-1/3'></div>
                <div className='h-4 bg-gray-300 rounded w-2/3'></div>
              </div>
            </div>
          </div>
          {/* Payment Section */}
          <div className='bg-white border border-gray-200 rounded-md p-6 animate-pulse'>
            <div className='h-6 bg-gray-300 rounded w-1/4 mb-4'></div>
            <div className='space-y-4'>
              {Array(4)
                .fill("")
                .map((_, i) => (
                  <div
                    key={i}
                    className='flex items-center space-x-4 border border-gray-300 rounded-md p-4'
                  >
                    <div className='h-6 w-6 bg-gray-300 rounded-full'></div>
                    <div className='h-4 bg-gray-300 rounded w-1/3'></div>
                  </div>
                ))}
            </div>
          </div>
          {/* Submit Button */}
          <div className='h-12 bg-gray-300 rounded w-full animate-pulse'></div>
        </div>
        {/* Right Section: Order Summary */}
        <div className='bg-white border border-gray-200 rounded-md p-6 lg:col-span-4 animate-pulse'>
          <div className='h-6 bg-gray-300 rounded w-1/4 mb-4'></div>
          <div className='space-y-4'>
            {Array(3)
              .fill("")
              .map((_, i) => (
                <div key={i} className='h-6 bg-gray-300 rounded w-full'></div>
              ))}
          </div>
          <div className='h-12 bg-gray-300 rounded w-full mt-6'></div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutLoadingPage;
