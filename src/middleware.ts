import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { getProviderMeLoader } from "./data/services/get-provider-me-loader";

export async function middleware(request: NextRequest) {
  const jwtUser = request.cookies.get('jwt-user');
  const jwtProvider = request.cookies.get('jwt-provider');
  let user = null;
  let provider = null;

  const currentPath = request.nextUrl.pathname;

  if (jwtUser) {
    user = await getUserMeLoader();
  } else if (jwtProvider) {
    provider = await getProviderMeLoader();
  }


  // Protect /dashboard route if user is null or user.ok is false
  if (currentPath.startsWith("/dashboard")) {
    if (!user || (user && !user.ok)) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }
  // Redirect authenticated users away from /signin and /signup if user logs in 
  if (currentPath.startsWith("/signin") || currentPath.startsWith("/signup")) {
    if (user && user.ok) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

//   // Protect /provider/dashboard-provider route if provider is null or provider.ok is false
//   if (currentPath.startsWith("/provider/dashboard-provider")) {
//     if (!provider || (provider && !provider.ok)) {
//       return NextResponse.redirect(new URL("/provider/signin", request.url));
//     }
//   }

// // Redirect authenticated providers away from /provider/signin and /provider/signup if provider logs in
//   if (currentPath.startsWith("/provider/signin") || currentPath.startsWith("/provider/signup")) {
//     if (provider && provider.ok) {
//       return NextResponse.redirect(new URL("/provider/dashboard-provider", request.url));
//     }
//   }

  return NextResponse.next();
}