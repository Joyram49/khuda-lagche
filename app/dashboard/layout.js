import DashboardHeader from "./_components/sidebar/dashboard-header";
import DashboardSidebar from "./_components/sidebar/dashboard-sidebar";

export default function DashboardLayout({ tabs }) {
  return (
    <div className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-muted/40 lg:block '>
        <DashboardSidebar />
      </div>
      <div className='flex flex-col '>
        <DashboardHeader />
        {tabs}
      </div>
    </div>
  );
}
