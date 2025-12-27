"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  product: string
  intent: string
  status: string
  created_at: string
}

interface LeadDetailFormProps {
  lead: Lead
}

const statusOptions = ["new", "contacted", "converted", "lost"]

export function LeadDetailForm({ lead }: LeadDetailFormProps) {
  const router = useRouter()
  const [status, setStatus] = useState(lead.status)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSave = async () => {
    setLoading(true)
    setMessage("")

    try {
      const response = await fetch(`https://leadapi.batworks.in/api/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        setMessage("Lead updated successfully")
        setTimeout(() => {
          router.push("/leads")
        }, 1000)
      } else {
        setMessage("Failed to update lead")
      }
    } catch (error) {
      setMessage("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <div className="p-3 bg-muted rounded-md">{lead.name}</div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <div className="p-3 bg-muted rounded-md">{lead.email}</div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <div className="p-3 bg-muted rounded-md">{lead.phone}</div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Product</label>
          <div className="p-3 bg-muted rounded-md">{lead.product}</div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Intent</label>
          <div className="p-3 bg-muted rounded-md">{lead.intent}</div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Created At</label>
          <div className="p-3 bg-muted rounded-md">{new Date(lead.created_at).toLocaleString()}</div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded-md bg-background"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {message && (
        <div
          className={`p-3 rounded-md text-sm ${
            message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <div className="flex gap-4">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        <Button variant="outline" onClick={() => router.push("/leads")} disabled={loading}>
          Cancel
        </Button>
      </div>
    </Card>
  )
}
