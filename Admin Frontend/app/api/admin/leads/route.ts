import { connectToDatabase } from "@/lib/mongodb"
import { Lead } from "@/models/Lead"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectToDatabase()
    const leads = await Lead.find().sort({ createdAt: -1 })
    return NextResponse.json(leads)
  } catch (error) {
    console.error("Error fetching leads:", error)
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
  }
}
