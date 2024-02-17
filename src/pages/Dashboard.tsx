import { memo } from "react";
import DashboardDayOverview from "../features/dashboard/DashboardDayOverview";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardSalePiechart from "../features/dashboard/DashboardSalePiechart";
import DashboardSalesTimechart from "../features/dashboard/DashboardSalesTimechart";
import DashboardTimeOverview from "../features/dashboard/DashboardTimeOverview";
import { useRecentOrder } from "../features/dashboard/useRecentOrder";
import Spinner from "../ui/Spinner";

const Dashboard = memo(() => {
  const { isLoading, completedOrder, numDays } = useRecentOrder();
  if (isLoading) return <Spinner />;
  return (
    <div className="container min-h-screen p-1">
      <div className="grid grid-cols-1">
        <DashboardFilter />
        <DashboardTimeOverview numDays={numDays} orders={completedOrder!} />
        <div className="mt-4 grid grid-cols-1 gap-3 lg:mt-8 lg:grid-cols-2">
          <DashboardDayOverview />
          <DashboardSalePiechart orders={completedOrder!} numDays={numDays} />
        </div>
        <DashboardSalesTimechart orders={completedOrder!} numDays={numDays} />
      </div>
    </div>
  );
});
export default Dashboard;
