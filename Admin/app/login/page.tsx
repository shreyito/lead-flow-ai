"use client"

import { type FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Zap, Lock } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (email === "admin@gmail.com" && password === "admin12345") {
      await fetch("/api/auth/login", { method: "POST" })
      router.push("/dashboard")
    } else {
      setError("Invalid email or password")
      setLoading(false)
    }
  }

  const fillDemoCredentials = () => {
    setEmail("admin@gmail.com")
    setPassword("admin12345")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-purple-50/30 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Card className="glass-card border-white/70 shadow-xl">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Admin Console</CardTitle>
            </div>
            <CardDescription>Sign in to access the management dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="border-primary/30 bg-primary/5 backdrop-blur-sm">
              <Lock className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm text-foreground ml-3">
                <span className="font-semibold">Demo Credentials:</span>
                <div className="mt-2 space-y-1 text-xs">
                  <div>
                    Email: <code className="bg-white/50 px-2 py-1 rounded text-foreground">admin@gmail.com</code>
                  </div>
                  <div>
                    Password: <code className="bg-white/50 px-2 py-1 rounded text-foreground">admin12345</code>
                  </div>
                </div>
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  disabled={loading}
                  className="glass bg-white/50 border-white/70 placeholder:text-muted-foreground/60"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="glass bg-white/50 border-white/70 placeholder:text-muted-foreground/60"
                />
              </div>
              {error && <div className="text-sm text-destructive font-medium">{error}</div>}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 transition-all text-white"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full border-border/50 hover:bg-white/30 transition-colors bg-white/20"
                onClick={fillDemoCredentials}
                disabled={loading}
              >
                Fill Demo Credentials
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          This is a demo admin console for testing purposes
        </p>
      </div>
    </div>
  )
}
