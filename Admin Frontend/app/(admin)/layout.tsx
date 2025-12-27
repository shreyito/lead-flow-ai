import type React from "react"
import { Sidebar } from "@/components/sidebar"

export const metadata = {
  title: "Admin Dashboard - Material Brand",
  description: "Admin dashboard for Material Brand",
}

async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-6 md:p-10">{children}</main>
    </div>
  )
}

export default AdminLayout
