// API client for backend
const API_BASE_URL = "https://leadapi.batworks.in"

export async function getLeads() {
  const response = await fetch(`${API_BASE_URL}/api/leads`, {
    cache: "no-store",
  })
  if (!response.ok) throw new Error("Failed to fetch leads")
  return response.json()
}

export async function getLead(id: string) {
  const response = await fetch(`${API_BASE_URL}/api/leads/${id}`, {
    cache: "no-store",
  })
  if (!response.ok) throw new Error("Failed to fetch lead")
  return response.json()
}

export async function updateLead(id: string, data: { status: string }) {
  const response = await fetch(`${API_BASE_URL}/api/leads/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Failed to update lead")
  return response.json()
}

export async function getLogs() {
  const response = await fetch(`${API_BASE_URL}/api/logs`, {
    cache: "no-store",
  })
  if (!response.ok) throw new Error("Failed to fetch logs")
  return response.json()
}
