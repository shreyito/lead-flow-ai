"use client"

import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  const getTitle = () => {
    if (pathname.startsWith("/dashboard")) return "Dashboard"
    if (pathname.startsWith("/leads")) return "Leads"
    if (pathname.startsWith("/logs")) return "Logs"
    return "Admin"
  }

  const getDescription = () => {
    if (pathname.startsWith("/dashboard")) return "Overview and key metrics"
    if (pathname.startsWith("/leads")) return "Manage and track all leads"
    if (pathname.startsWith("/logs")) return "System activity logs"
    return ""
  }

  return (
    <header className="sticky top-0 glass-dark border-b border-border/30 px-8 py-6 z-40">
      <div className="flex items-baseline justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">{getTitle()}</h2>
          <p className="text-sm text-muted-foreground mt-1">{getDescription()}</p>
        </div>
      </div>
    </header>
  )
}
