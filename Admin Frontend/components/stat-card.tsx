import type React from "react"
import { Card } from "@/components/ui/card"

interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  color?: "blue" | "green" | "orange" | "purple"
}

const colorClasses = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
  green: "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400",
}

export function StatCard({ label, value, icon, color = "blue" }: StatCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
          <p className="text-4xl font-bold mt-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
            {value}
          </p>
        </div>
        {icon && <div className={`p-3 rounded-xl ${colorClasses[color]}`}>{icon}</div>}
      </div>
    </Card>
  )
}
