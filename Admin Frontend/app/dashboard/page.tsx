import AdminLayout from "@/app/admin-layout"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { LeadsCharts } from "@/components/dashboard/leads-charts"
import { RecentLeadsTable } from "@/components/dashboard/recent-leads-table"

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Here's an overview of your leads</p>
        </div>

        <StatsCards />

        <LeadsCharts />

        <RecentLeadsTable />
      </div>
    </AdminLayout>
  )
}
