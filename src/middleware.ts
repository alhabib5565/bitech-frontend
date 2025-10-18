import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;
  console.log(token, "token from middleware");
  // if user is not logged in
  if (!token) {
    if (pathname.startsWith("/products")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // if user is logged in
  if (token) {
    if (pathname === "/" || pathname === "/login") {
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/products/:path*"],
};
