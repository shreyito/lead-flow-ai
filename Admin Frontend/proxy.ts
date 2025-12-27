import { type NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  const authCookie = request.cookies.get("admin-auth")
  const { pathname } = request.nextUrl

  // Allow login page and skip middleware for public routes
  if (pathname === "/login" || pathname === "/") {
    return NextResponse.next()
  }

  // Protect admin routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/leads") || pathname.startsWith("/logs")) {
    if (!authCookie) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/leads/:path*", "/logs/:path*", "/login"],
}
