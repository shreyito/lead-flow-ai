"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, ListChecks as ListTasks, FileText, LogOut, Zap } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (path: string) => pathname.startsWith(path)

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  return (
    <aside className="w-64 glass-dark border-r border-border/30 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-border/20 bg-gradient-to-b from-white/20 to-transparent">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-bold text-sidebar-foreground">Admin</h1>
        </div>
        <p className="text-xs text-sidebar-foreground/60">Management Console</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link href="/dashboard">
          <Button
            variant={isActive("/dashboard") ? "default" : "ghost"}
            className={`w-full justify-start transition-all ${
              isActive("/dashboard")
                ? "glass-glow bg-gradient-to-r from-primary/90 to-accent/90 text-sidebar-primary-foreground border-primary/50 hover:from-primary hover:to-accent"
                : "hover:glass text-sidebar-foreground hover:text-sidebar-foreground"
            }`}
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </Link>

        <Link href="/leads">
          <Button
            variant={isActive("/leads") ? "default" : "ghost"}
            className={`w-full justify-start transition-all ${
              isActive("/leads")
                ? "glass-glow bg-gradient-to-r from-primary/90 to-accent/90 text-sidebar-primary-foreground border-primary/50 hover:from-primary hover:to-accent"
                : "hover:glass text-sidebar-foreground hover:text-sidebar-foreground"
            }`}
          >
            <ListTasks className="w-4 h-4 mr-2" />
            Leads
          </Button>
        </Link>

        <Link href="/logs">
          <Button
            variant={isActive("/logs") ? "default" : "ghost"}
            className={`w-full justify-start transition-all ${
              isActive("/logs")
                ? "glass-glow bg-gradient-to-r from-primary/90 to-accent/90 text-sidebar-primary-foreground border-primary/50 hover:from-primary hover:to-accent"
                : "hover:glass text-sidebar-foreground hover:text-sidebar-foreground"
            }`}
          >
            <FileText className="w-4 h-4 mr-2" />
            Logs
          </Button>
        </Link>
      </nav>

      <div className="p-4 border-t border-border/20 bg-gradient-to-t from-white/10 to-transparent">
        <Button
          className="w-full justify-start glass glass-hover bg-red-500/10 text-red-600 border-red-200 hover:bg-red-500/20"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
