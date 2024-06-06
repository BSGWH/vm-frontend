import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { getProviderMeLoader } from "./data/services/get-provider-me-loader";

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  const provider = await getProviderMeLoader();
  const currentPath = request.nextUrl.pathname;

  if (currentPath.startsWith("/dashboard") && user.ok === false) {
    return NextResponse.redirect(new URL("/signin", request.url));

  }
  if (currentPath.startsWith("/signin") && user.ok === true) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (currentPath.startsWith("/signup") && user.ok === true) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (currentPath.startsWith("/provider/dashboard-provider") && provider.ok === false) {
    return NextResponse.redirect(new URL("/provider/signin", request.url));

  }
  if (currentPath.startsWith("/provider/signin") && provider.ok === true) {
    return NextResponse.redirect(new URL("/provider/dashboard-provider", request.url));
  }

  if (currentPath.startsWith("/provider/signup") && provider.ok === true) {
    return NextResponse.redirect(new URL("/provider/dashboard-provider", request.url));
  }

  return NextResponse.next();
}