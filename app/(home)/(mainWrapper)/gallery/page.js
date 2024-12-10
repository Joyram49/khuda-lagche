import ImageGallery from "./_components/offline-image-gallery";

export const metadata = {
  title: "Image Gallery | Khuda-Lagche",
  description:
    "Dive into our vibrant food gallery, where every image tells a story of flavor and passion. From sizzling dishes to mouthwatering desserts, indulge your senses before you order.",
};

function GalleryPage() {
  return (
    <div className='w-full bg-backgroundF'>
      <div className='container h-full overflow-hidden relative z-10 '>
        <div className='h-full w-full flex-col flex justify-around items-center gap-y-10 sm:gap-y-20 py-10 md:py-20'>
          <div className='flex flex-col items-center text-center'>
            <h1 className='text-xl sm:text-3xl xl:text-5xl 3xl:text-6xl font-robotoSlab uppercase text-foreground '>
              View the dishes
            </h1>
            <p className='text-muted-foreground font-medium font-robotoSlab text-sm pt-1 sm:pt-2'>
              From the Gallery
            </p>
          </div>

          <div className='w-full flex justify-center items-center bg-topBackground drop-shadow-sm p-4 md:p-6 rounded-md border-[1px] border-border dark:border-borderF'>
            <ImageGallery />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryPage;
