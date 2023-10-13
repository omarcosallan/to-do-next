import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("task-authToken")?.value;

  const signInURL = new URL("/", request.url);
  const taskURL = new URL("/tasks", request.url);

  if (!token) {
    if (request.nextUrl.pathname === "/") return NextResponse.next();
    return NextResponse.redirect(signInURL);
  }

  if (request.nextUrl.pathname != "/") {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/", "/tasks", "/dashboard"],
};
