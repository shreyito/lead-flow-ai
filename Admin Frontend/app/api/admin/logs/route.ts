import { connectToDatabase } from "@/lib/mongodb"
import { Log } from "@/models/Log"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectToDatabase()
    const logs = await Log.find().sort({ createdAt: -1 }).limit(200)
    return NextResponse.json(logs)
  } catch (error) {
    console.error("Error fetching logs:", error)
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 })
  }
}
