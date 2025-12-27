import { getLeads } from "@/lib/api"
import { StatCard } from "@/components/stat-card"
import { LeadsStatusChart } from "@/components/leads-status-chart"
import { TrendingUp, Users, MessageSquare, CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "Dashboard - Material Brand Admin",
  description: "Admin dashboard overview",
}

async function Dashboard() {
  try {
    const leads = await getLeads()

    const totalLeads = leads.length || 0
    const newLeads = leads.filter((lead: any) => lead.status === "new").length || 0
    const contactedLeads = leads.filter((lead: any) => lead.status === "contacted").length || 0
    const convertedLeads = leads.filter((lead: any) => lead.status === "converted").length || 0
    const lostLeads = leads.filter((lead: any) => lead.status === "lost").length || 0

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">Welcome back. Here's your sales overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Leads" value={totalLeads} icon={<Users size={24} />} color="blue" />
          <StatCard label="New Leads" value={newLeads} icon={<TrendingUp size={24} />} color="orange" />
          <StatCard label="Contacted" value={contactedLeads} icon={<MessageSquare size={24} />} color="purple" />
          <StatCard label="Converted" value={convertedLeads} icon={<CheckCircle2 size={24} />} color="green" />
        </div>

        {/* Leads Status Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <LeadsStatusChart
            data={{
              new: newLeads,
              contacted: contactedLeads,
              converted: convertedLeads,
              lost: lostLeads,
            }}
          />
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
          Failed to load dashboard data. Please try again later.
        </div>
      </div>
    )
  }
}

export default Dashboard
