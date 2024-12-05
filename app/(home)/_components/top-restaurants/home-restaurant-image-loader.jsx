import Image from "next/image";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

function HomeRestaurantImageLoader({ data }) {
  return data?.thumbnail ? (
    <Image
      width={20}
      height={20}
      src={`${urlEndpoint}${data?.thumbnail}`}
      alt={data?.name}
      className='absolute object-cover w-[80%] aspect-square top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-[32px] z-100'
      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    />
  ) : (
    <Image
      fill
      src={`${urlEndpoint}/sample-folder/image.png`}
      alt={data?.name}
      className='absolute object-cover w-[50%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] '
      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    />
  );
}

export default HomeRestaurantImageLoader;
