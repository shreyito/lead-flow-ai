"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Pagination } from "@/components/pagination"

interface Log {
  id: string
  type: string
  message: string
  timestamp: string
}

interface LogsTableProps {
  logs: Log[]
}

const typeColors: Record<string, string> = {
  info: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
  warning: "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300",
  error: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300",
  success: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300",
}

const ITEMS_PER_PAGE = 15

export function LogsTable({ logs }: LogsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(logs.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedLogs = logs.slice(startIndex, endIndex)

  if (logs.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No logs found</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="border border-border rounded-xl overflow-hidden bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Message</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedLogs.map((log) => (
                <tr key={log.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        typeColors[log.type] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{log.message}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(endIndex, logs.length)} of {logs.length} logs
        </p>
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
      </div>
    </div>
  )
}
