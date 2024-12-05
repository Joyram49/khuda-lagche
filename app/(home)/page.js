import CallToAction from "./_components/call-to-action";
import DownloadApp from "./_components/download-app/download-app";
import GoTop from "./_components/go-top";
import HomeCategory from "./_components/home-category/home-category";
import HotDealWithNewDishes from "./_components/hot-deal-&-newDish/hot-deal-with-new-dishes";
import HowToOrder from "./_components/how-to-order/how-to-order";
import ImageGallery from "./_components/image-gallery/image-gallery";
import { LandingHeroCarousel } from "./_components/landing-hero";
import NewsAndArtcles from "./_components/news-and-articles/news-and-articles";
import PeoplesChoice from "./_components/peoples-choice/peoples-choice";
import PopularDishes from "./_components/popular-dishes/popular-dishes";
import Testimonials from "./_components/testimonials/testimonials";
import TopRestaurants from "./_components/top-restaurants/top-restaurants";

function HomePage() {
  return (
    <section className='w-full'>
      <LandingHeroCarousel />
      <HomeCategory />
      <HowToOrder />
      <DownloadApp />
      <PopularDishes />
      <HotDealWithNewDishes />
      <TopRestaurants />
      <Testimonials bg={true} />
      <PeoplesChoice bg={false} />
      <NewsAndArtcles />
      <ImageGallery />
      <CallToAction />
      <GoTop />
    </section>
  );
}

export default HomePage;
