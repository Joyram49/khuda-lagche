import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

async function DashboardAnalyticsPage() {
  const session = await auth();
  if (session?.error === "RefreshAccessTokenError") {
    redirect("/login");
  }
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex items-center'>
        <h1 className='text-lg font-semibold md:text-2xl'>Inventory</h1>
      </div>
      <div
        className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'
        x-chunk='dashboard-02-chunk-1'
      >
        <div className='flex flex-col items-center gap-1 text-center'>
          <h3 className='text-2xl font-bold tracking-tight'>
            This is an analytics page
          </h3>
          <p className='text-sm text-muted-foreground'>
            You can find all the data analytics here.
          </p>
          <Button className='mt-4'>Create Analytics</Button>
        </div>
      </div>
    </main>
  );
}

export default DashboardAnalyticsPage;
