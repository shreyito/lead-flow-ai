import AdminLayout from "@/app/admin-layout"
import { LeadDetail } from "@/components/leads/lead-detail"

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <AdminLayout>
      <div className="p-8">
        <LeadDetail id={id} />
      </div>
    </AdminLayout>
  )
}
