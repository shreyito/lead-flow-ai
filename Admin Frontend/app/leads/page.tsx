import AdminLayout from "@/app/admin-layout"
import { LeadsTable } from "@/components/leads/leads-table"

export default function LeadsPage() {
  return (
    <AdminLayout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Leads Management</h1>
          <p className="text-muted-foreground">View and manage all leads</p>
        </div>
        <LeadsTable />
      </div>
    </AdminLayout>
  )
}
