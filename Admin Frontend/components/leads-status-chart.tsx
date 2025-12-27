"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface LeadsStatusChartProps {
  data: {
    new: number
    contacted: number
    converted: number
    lost: number
  }
}

export function LeadsStatusChart({ data }: LeadsStatusChartProps) {
  const chartData = [
    { name: "New", value: data.new, fill: "hsl(var(--color-chart-1))" },
    { name: "Contacted", value: data.contacted, fill: "hsl(var(--color-chart-2))" },
    { name: "Converted", value: data.converted, fill: "hsl(var(--color-chart-4))" },
    { name: "Lost", value: data.lost, fill: "hsl(var(--color-chart-5))" },
  ].filter((item) => item.value > 0)

  const total = data.new + data.contacted + data.converted + data.lost

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle>Leads Status Distribution</CardTitle>
        <CardDescription>Breakdown of leads by current status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} leads`, "Count"]}
                contentStyle={{
                  backgroundColor: "hsl(var(--color-card))",
                  border: "1px solid hsl(var(--color-border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">New</p>
            <p className="text-2xl font-bold text-chart-1">{data.new}</p>
            <p className="text-xs text-muted-foreground mt-1">{((data.new / total) * 100).toFixed(1)}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Contacted</p>
            <p className="text-2xl font-bold text-chart-2">{data.contacted}</p>
            <p className="text-xs text-muted-foreground mt-1">{((data.contacted / total) * 100).toFixed(1)}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Converted</p>
            <p className="text-2xl font-bold text-chart-4">{data.converted}</p>
            <p className="text-xs text-muted-foreground mt-1">{((data.converted / total) * 100).toFixed(1)}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Lost</p>
            <p className="text-2xl font-bold text-chart-5">{data.lost}</p>
            <p className="text-xs text-muted-foreground mt-1">{((data.lost / total) * 100).toFixed(1)}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
