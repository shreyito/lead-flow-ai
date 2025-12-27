import { getLogs } from "@/lib/api"
import { LogsTable } from "@/components/logs-table"

export const metadata = {
  title: "Logs - Material Brand Admin",
  description: "System logs and activity",
}

async function LogsPage() {
  try {
    const logs = await getLogs()

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">System Logs</h1>
          <p className="text-muted-foreground mt-1">Activity and system events</p>
        </div>

        <LogsTable logs={logs} />
      </div>
    )
  } catch (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">System Logs</h1>
        <div className="p-4 bg-destructive/10 text-destructive rounded-md">
          Failed to load logs. Please try again later.
        </div>
      </div>
    )
  }
}

export default LogsPage
