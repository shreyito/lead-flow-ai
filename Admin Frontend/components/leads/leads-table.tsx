"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight } from "lucide-react"
import type { ILead } from "@/types"

const ITEMS_PER_PAGE = 10

export function LeadsTable() {
  const [leads, setLeads] = useState<ILead[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

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

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) || lead.email.toLowerCase().includes(search.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  if (loading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-white/20 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500/15 text-blue-700 border-blue-300/50"
      case "contacted":
        return "bg-yellow-500/15 text-yellow-700 border-yellow-300/50"
      case "closed":
        return "bg-green-500/15 text-green-700 border-green-300/50"
      default:
        return "bg-gray-500/15 text-gray-700 border-gray-300/50"
    }
  }

  return (
    <Card className="glass-card border-white/60">
      <CardHeader className="border-b border-white/30">
        <CardTitle>All Leads</CardTitle>
        <CardDescription>Total: {filteredLeads.length} leads</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 glass bg-white/50 border-white/70 focus:border-white/90 focus:glass"
          />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/30 hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Intent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLeads.length > 0 ? (
                paginatedLeads.map((lead) => (
                  <TableRow key={lead._id} className="border-white/30 hover:bg-white/20 transition-colors">
                    <TableCell className="font-medium text-foreground">{lead.name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{lead.email}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.product}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.intent || "-"}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getStatusColor(lead.status)}`}
                      >
                        {lead.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/leads/${lead._id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary hover:bg-primary/10"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No leads found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-white/30">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages} • {filteredLeads.length} total
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="glass bg-white/40 border-white/70 hover:bg-white/50 text-foreground"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="glass bg-white/40 border-white/70 hover:bg-white/50 text-foreground"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
