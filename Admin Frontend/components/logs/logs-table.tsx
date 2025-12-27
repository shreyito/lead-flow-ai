"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import type { ILog } from "@/types"

const ITEMS_PER_PAGE = 15

export function LogsTable() {
  const [logs, setLogs] = useState<ILog[]>([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("/api/admin/logs")
        const data = await response.json()
        setLogs(data)
      } catch (error) {
        console.error("Error fetching logs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [])

  const filteredLogs = filterType === "all" ? logs : logs.filter((log) => log.type === filterType)
  const logTypes = [...new Set(logs.map((log) => log.type))]

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  useEffect(() => {
    setCurrentPage(1)
  }, [filterType])

  if (loading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
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

  return (
    <Card className="glass-card border-white/60">
      <CardHeader className="border-b border-white/30">
        <CardTitle>Activity Logs</CardTitle>
        <CardDescription>Total: {filteredLogs.length} logs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-muted-foreground">Filter by type:</label>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="max-w-xs glass bg-white/50 border-white/70 text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-card border-white/60">
              <SelectItem value="all">All Types</SelectItem>
              {logTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/30 hover:bg-transparent">
                <TableHead>Type</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Lead ID</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLogs.length > 0 ? (
                paginatedLogs.map((log) => (
                  <TableRow key={log._id} className="border-white/30 hover:bg-white/20 transition-colors">
                    <TableCell className="font-medium">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/15 text-primary border border-primary/30">
                        {log.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-foreground">{log.message}</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {log.leadId ? log.leadId.slice(0, 8) + "..." : "-"}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(log.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No logs found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-white/30">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages} • {filteredLogs.length} total
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
