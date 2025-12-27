"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, AlertCircle } from "lucide-react"
import type { ILead } from "@/types"

export function StatsCards() {
  const [leads, setLeads] = useState<ILead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("/api/admin/leads")
        const data = await response.json()
        setLeads(data)
      } catch (error) {
        console.error("Error fetching leads:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()
  }, [])

  const totalLeads = leads.length
  const newLeads = leads.filter((lead) => lead.status === "new").length
  const slaBreached = leads.filter((lead) => {
    const createdAt = new Date(lead.createdAt)
    const now = new Date()
    const hoursDiff = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60)
    return hoursDiff > 24 && lead.status !== "closed"
  }).length

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="h-32 glass-card animate-pulse" />
        ))}
      </div>
    )
  }

  const stats = [
    {
      title: "Total Leads",
      value: totalLeads,
      icon: Users,
      color: "from-blue-500/20 to-cyan-500/20",
      textColor: "text-blue-600",
    },
    {
      title: "New Leads",
      value: newLeads,
      icon: TrendingUp,
      color: "from-green-500/20 to-emerald-500/20",
      textColor: "text-green-600",
    },
    {
      title: "SLA Breached",
      value: slaBreached,
      icon: AlertCircle,
      color: "from-red-500/20 to-orange-500/20",
      textColor: "text-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="glass-card glass-hover overflow-hidden group border-white/60">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} backdrop-blur-sm`}>
                  <Icon className={`w-4 h-4 ${stat.textColor}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
