import { getLead } from "@/lib/api"
import { LeadDetailForm } from "@/components/lead-detail-form"

export const metadata = {
  title: "Lead Details - Material Brand Admin",
  description: "View and edit lead details",
}

async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  try {
    // ✅ IMPORTANT FIX
    const { id } = await params

    const lead = await getLead(id)

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{lead.name}</h1>
          <p className="text-muted-foreground mt-1">
            Lead ID: {lead._id}
          </p>
        </div>

        <LeadDetailForm lead={lead} />
      </div>
    )
  } catch (error) {
    console.error("Failed to load lead details:", error)

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Lead Details</h1>
        <div className="p-4 bg-destructive/10 text-destructive rounded-md">
          Failed to load lead details. Please try again later.
        </div>
      </div>
    )
  }
}

export default LeadDetailPage
