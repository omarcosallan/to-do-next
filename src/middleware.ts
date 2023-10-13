import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("task-authToken")?.value;

  const signInURL = new URL("/", request.url);
  const taskURL = new URL("/tasks", request.url);

  // Verifique se o middleware deve ser aplicado apenas nas rotas especificadas
  const protectedRoutes = ["/", "/tasks", "/dashboard"];
  const currentPath = request.nextUrl.pathname;

  if (!token && protectedRoutes.includes(currentPath)) {
    if (currentPath === "/") return NextResponse.next();
    return NextResponse.redirect(signInURL);
  }

  return NextResponse.next();
}
