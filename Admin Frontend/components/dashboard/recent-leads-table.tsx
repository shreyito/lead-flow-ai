"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { ILead } from "@/types"

export function RecentLeadsTable() {
  const [leads, setLeads] = useState<ILead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("/api/admin/leads")
        const data = await response.json()
        setLeads(data.slice(0, 5))
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
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "contacted":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      case "closed":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <CardTitle>Recent Leads</CardTitle>
        <CardDescription>Last 5 leads sorted by creation date</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border/30">
              <TableHead>Name</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Intent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead._id} className="border-border/30 hover:bg-secondary/50 transition-colors">
                <TableCell className="font-medium text-foreground">{lead.name}</TableCell>
                <TableCell className="text-muted-foreground">{lead.product}</TableCell>
                <TableCell className="text-muted-foreground">{lead.intent || "-"}</TableCell>
                <TableCell>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/leads/${lead._id}`}>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
