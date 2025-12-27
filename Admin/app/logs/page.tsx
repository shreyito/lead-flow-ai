import AdminLayout from "@/app/admin-layout"
import { LogsTable } from "@/components/logs/logs-table"

export default function LogsPage() {
  return (
    <AdminLayout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Activity Logs</h1>
          <p className="text-muted-foreground">View all system activity and lead updates</p>
        </div>
        <LogsTable />
      </div>
    </AdminLayout>
  )
}
