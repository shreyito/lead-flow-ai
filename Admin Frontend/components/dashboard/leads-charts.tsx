"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { ILead } from "@/types"

export function LeadsCharts() {
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-80 glass-card animate-pulse" />
        <Card className="h-80 glass-card animate-pulse" />
      </div>
    )
  }

  const statusData = [
    {
      name: "New",
      value: leads.filter((l) => l.status === "new").length,
    },
    {
      name: "Contacted",
      value: leads.filter((l) => l.status === "contacted").length,
    },
    {
      name: "Closed",
      value: leads.filter((l) => l.status === "closed").length,
    },
  ]

  const productData = Object.entries(
    leads.reduce(
      (acc, lead) => {
        acc[lead.product] = (acc[lead.product] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ),
  ).map(([name, value]) => ({
    name,
    value,
  }))

  const COLORS = ["#4f46e5", "#06b6d4", "#ec4899"]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="glass-card border-white/60">
        <CardHeader>
          <CardTitle>Lead Status Distribution</CardTitle>
          <CardDescription>Overview of leads by status</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-card border-white/60">
        <CardHeader>
          <CardTitle>Leads by Product</CardTitle>
          <CardDescription>Lead distribution across products</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Bar dataKey="value" fill="#4f46e5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
