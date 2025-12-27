"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ILead, ILog } from "@/types"

interface LeadDetailProps {
  id: string
}

export function LeadDetail({ id }: LeadDetailProps) {
  const [lead, setLead] = useState<ILead | null>(null)
  const [logs, setLogs] = useState<ILog[]>([])
  const [status, setStatus] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leadResponse = await fetch(`/api/admin/leads/${id}`)
        const leadData = await leadResponse.json()
        setLead(leadData)
        setStatus(leadData.status)

        const logsResponse = await fetch("/api/admin/logs")
        const logsData = await logsResponse.json()
        setLogs(logsData.filter((log: ILog) => log.leadId === id))
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleSave = async () => {
    if (!lead) return
    setSaving(true)
    try {
      const response = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        const updatedLead = await response.json()
        setLead(updatedLead)
        // Refresh logs
        const logsResponse = await fetch("/api/admin/logs")
        const logsData = await logsResponse.json()
        setLogs(logsData.filter((log: ILog) => log.leadId === id))
      }
    } catch (error) {
      console.error("Error saving lead:", error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-muted rounded animate-pulse" />
        <div className="h-96 bg-muted rounded animate-pulse" />
      </div>
    )
  }

  if (!lead) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Lead not found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{lead.name}</h1>
          <p className="text-muted-foreground">{lead.email}</p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lead Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium text-foreground">{lead.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{lead.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">{lead.phone || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Product</p>
                  <p className="font-medium text-foreground">{lead.product}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Intent</p>
                  <p className="font-medium text-foreground">{lead.intent || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium text-foreground">{lead.category || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Urgency</p>
                  <p className="font-medium text-foreground">{lead.urgency || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Source</p>
                  <p className="font-medium text-foreground">{lead.source || "-"}</p>
                </div>
              </div>

              {lead.message && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Message</p>
                  <p className="font-medium text-foreground bg-muted p-3 rounded">{lead.message}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground mb-2">Created</p>
                <p className="font-medium text-foreground">{new Date(lead.createdAt).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Logs</CardTitle>
              <CardDescription>Recent actions on this lead</CardDescription>
            </CardHeader>
            <CardContent>
              {logs.length > 0 ? (
                <div className="space-y-4">
                  {logs.map((log) => (
                    <div key={log._id} className="flex gap-4 pb-4 border-b border-border last:border-0">
                      <div>
                        <p className="text-sm font-medium text-foreground">{log.type}</p>
                        <p className="text-sm text-muted-foreground">{log.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(log.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No activity logs</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Lead Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSave} disabled={saving} className="w-full">
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
