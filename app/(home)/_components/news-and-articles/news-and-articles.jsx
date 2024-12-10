import HoverLink from "@/components/hover-link";
import ArticleCard from "./article-card";
const articles = [
  {
    id: 1,
    author: "Mark Whiteman",
    title: "Most Popular Dishes This Week",
    content:
      "From Ravioli with spinach and ricotta cheese to Farfalle with mushrooms and spinach, here are the dishes our customers ordered most this week. We want to hear what you think.",
    imageUrl: "articles/article-1.jpg",
    comment: 0,
    favorite: 30,
    tag: ["non-veg, popular, italian, pizza"],
    category: "pizza",
    publishedOn: "July 23, 2022",
  },
  {
    id: 2,
    author: "Will Smith",
    title: "How To Cook Italian Pasta at Home",
    content:
      "Made with flour, pasta can be formed into sheets, strips or any other shape. In fact, you’ll find over 600 pasta shapes across the globe.  This may seem fairly simple, but sometimes it may leave you with lumpy and limp results.",
    imageUrl: "articles/article-2.jpg",
    comment: 0,
    favorite: 54,
    tag: ["veg, popular, italian, pasta"],
    category: "pasta",
    publishedOn: "April 10, 2022",
  },
  {
    id: 3,
    author: "Tim Cook",
    title: "Best 10 Burgers Recipes",
    content:
      "Fire up the grill and try one of these burger ideas. Here are our very best recipes so you’re sure to please every guest at your table. From classic ground chuck to vegan patties, let’s be frank about burgers: What’s not to love? ",
    imageUrl: "articles/article-3.jpg",
    comment: 0,
    favorite: 43,
    tag: ["veg, popular, american, burger"],
    category: "burger",
    publishedOn: "June 17, 2022",
  },
];

function NewsAndArtcles() {
  return (
    <section className='h-auto bg-topBackground '>
      <div className='container'>
        <div className=' h-full w-full  flex-col  flex justify-around items-center gap-y-10 sm:gap-y-20 py-10 md:py-20'>
          {/* peoples choice header */}
          <div className='flex flex-col  items-center text-center'>
            <h1 className='text-xl sm:text-3xl xl:text-5xl 3xl:text-6xl  font-robotoSlab uppercase text-foreground '>
              News <span className='text-hoverYellow'>&</span> Articles
            </h1>
            <p className=' text-muted-foreground font-medium font-robotoSlab text-sm pt-1 sm:pt-2 '>
              From the Blog
            </p>
          </div>
          {/* mes article card content */}
          <div className='w-full'>
            <div className='w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-6 lg:gap-x-10 gap-y-6 '>
              {articles.map((article, index) => (
                <div
                  key={article.id}
                  className={`${
                    index === 2
                      ? "md:col-span-2 lg:col-span-1  flex justify-center"
                      : "justify-self-center"
                  }`}
                >
                  <ArticleCard data={article} />
                </div>
              ))}
            </div>
          </div>
          {/* peoples choice footer */}
          <div>
            <HoverLink text='View More Articles' link='#' />
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsAndArtcles;
