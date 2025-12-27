export interface ILead {
  _id: string
  name: string
  email: string
  phone?: string
  product: string
  message?: string
  source?: string
  intent?: string
  category?: string
  urgency?: "low" | "medium" | "high"
  status: "new" | "contacted" | "closed"
  createdAt: string
  updatedAt: string
}

export interface ILog {
  _id: string
  type: string
  leadId?: string
  message: string
  createdAt: string
}
