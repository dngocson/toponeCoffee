import DashboardDayOverview from "../features/dashboard/DashboardDayOverview";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardSalePiechart from "../features/dashboard/DashboardSalePiechart";
import DashboardSalesTimechart from "../features/dashboard/DashboardSalesTimechart";
import DashboardTimeOverview from "../features/dashboard/DashboardTimeOverview";
import { useRecentOrder } from "../features/dashboard/useRecentOrder";
import Spinner from "../ui/Spinner";

export default function Dashboard() {
  const { isLoading, completedOrder, numDays } = useRecentOrder();
  if (isLoading) return <Spinner />;
  return (
    <div className="container min-h-screen p-1">
      <div className="grid grid-cols-4 gap-4">
        <DashboardFilter />
        <DashboardTimeOverview numDays={numDays} orders={completedOrder!} />

        <DashboardDayOverview />
        <DashboardSalePiechart orders={completedOrder!} numDays={numDays} />

        <DashboardSalesTimechart orders={completedOrder!} numDays={numDays} />
      </div>
    </div>
  );
}
