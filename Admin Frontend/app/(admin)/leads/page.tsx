import { getLeads } from "@/lib/api"
import { LeadsTable } from "@/components/leads-table"

export const metadata = {
  title: "Leads - Material Brand Admin",
  description: "Manage leads and enquiries",
}

async function LeadsPage() {
  try {
    const leads = await getLeads()

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-muted-foreground mt-1">Manage all customer enquiries</p>
        </div>

        <LeadsTable leads={leads} />
      </div>
    )
  } catch (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Leads</h1>
        <div className="p-4 bg-destructive/10 text-destructive rounded-md">
          Failed to load leads. Please try again later.
        </div>
      </div>
    )
  }
}

export default LeadsPage
