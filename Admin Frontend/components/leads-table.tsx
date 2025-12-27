import Link from "next/link"

interface Lead {
  _id: string
  name: string
  email?: string
  product?: string
  intent?: string
  status: string
  createdAt?: string
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <div className="overflow-x-auto border rounded-md">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted">
            <th className="p-3 text-left border">Name</th>
            <th className="p-3 text-left border">Product</th>
            <th className="p-3 text-left border">Intent</th>
            <th className="p-3 text-left border">Status</th>
            <th className="p-3 text-left border">Action</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="hover:bg-muted/50">
              <td className="p-3 border">{lead.name}</td>
              <td className="p-3 border">{lead.product || "-"}</td>
              <td className="p-3 border">{lead.intent || "-"}</td>
              <td className="p-3 border capitalize">{lead.status}</td>
              <td className="p-3 border">
                <Link
                  href={`/leads/${lead._id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}

          {leads.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-muted-foreground">
                No leads found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
