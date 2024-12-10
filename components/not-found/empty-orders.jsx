import Link from "next/link";

export default function EmptyOrder({ text, status }) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen  '>
      <div className='text-center space-y-2'>
        {/* Animated SVG */}
        <div className='w-64 h-64 mx-auto'>
          <EmptyOrderSvg />
        </div>

        {/* Heading */}
        <h1 className='text-2xl md:text-3xl font-bold text-[#d77a5d]'>
          Oops! Your {status}&apos;s basket is empty
        </h1>
        <p className='text-lg text-pText pb-6'>{text}</p>

        {/* CTA Button */}
        <Link href='/foodItems'>
          <p className='inline-block bg-[#f4a261] text-white px-8 py-3 rounded-full text-lg shadow-lg hover:bg-[#e76f51] transition-all duration-300'>
            {status}
          </p>
        </Link>
      </div>
    </div>
  );
}

// SVG Component
function EmptyOrderSvg() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 400 300'
      width='100%'
      height='100%'
    >
      {/* <!-- Background circle --> */}
      <circle cx='200' cy='150' r='140' fill='#fdf5f1' />

      {/* <!-- Basket --> */}
      <path
        d='M130,200 L270,200 L250,240 L150,240 Z'
        fill='#ffb26b'
        stroke='#d77a5d'
        strokeWidth='2'
      >
        <animateTransform
          attributeName='transform'
          type='scale'
          values='1 1;1.05 1.05;1 1'
          dur='2s'
          repeatCount='indefinite'
        />
      </path>

      {/* <!-- Handles --> */}
      <path
        d='M140,200 C140,180 160,160 200,160 C240,160 260,180 260,200'
        fill='none'
        stroke='#d77a5d'
        strokeWidth='4'
        strokeLinecap='round'
      >
        <animate
          attributeName='stroke-dasharray'
          from='0,500'
          to='500,0'
          dur='3s'
          repeatCount='indefinite'
        />
      </path>

      {/* <!-- Floating circles --> */}
      <circle cx='160' cy='120' r='8' fill='#f7c1b3'>
        <animate
          attributeName='cy'
          values='120;110;120'
          dur='1.5s'
          repeatCount='indefinite'
        />
      </circle>
      <circle cx='240' cy='110' r='6' fill='#ffd6a5'>
        <animate
          attributeName='cy'
          values='110;100;110'
          dur='2s'
          repeatCount='indefinite'
        />
      </circle>
      <circle cx='200' cy='100' r='12' fill='#f4a261'>
        <animate
          attributeName='cy'
          values='100;90;100'
          dur='2.5s'
          repeatCount='indefinite'
        />
      </circle>
    </svg>
  );
}
