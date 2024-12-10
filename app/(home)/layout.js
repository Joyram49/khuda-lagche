import { auth } from "@/auth";
import Header from "@/components/header";
import { SiteFooter } from "@/components/site-footer";
import HeaderHeightProvider from "../provider/headerHeightProvider";
import SearchOverlayProvider from "../provider/SearchOverlayProvider";

async function MainLayout({ children }) {
  const session = await auth();

  return (
    <HeaderHeightProvider>
      <SearchOverlayProvider>
        <div className='min-h-screen flex flex-col w-auto'>
          <Header session={session} />
          <main className='h-auto mt-32 md:mt-28 flex flex-col '>
            {children}
          </main>
          <SiteFooter className={"h-auto bg-topBackground "} />
        </div>
      </SearchOverlayProvider>
    </HeaderHeightProvider>
  );
}
export default MainLayout;
