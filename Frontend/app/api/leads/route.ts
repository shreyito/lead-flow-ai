import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    console.log("[v0] New lead inquiry received:", data)

    // Simulate real API processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({ success: true, message: "Lead captured" })
  } catch (error) {
    console.error("[v0] Error processing lead:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
