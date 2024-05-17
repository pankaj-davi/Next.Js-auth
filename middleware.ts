// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getAccessToken,
  getRefreshToken,
  isAccessTokenValid,
  refreshTokens,
} from "./utils/authUtils";

export async function middleware(request: NextRequest) {
  const accessToken =
    (await getAccessToken()) ||
    request.cookies.get("accessToken")?.value ||
    undefined;
  const refreshToken =
    (await getRefreshToken()) ||
    request.cookies.get("refreshToken")?.value ||
    undefined;

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!(await isAccessTokenValid(accessToken))) {
    if (refreshToken) {
      const res = NextResponse.next()
      try {
        const { newaccessToken, newRefreshToken } = await refreshTokens(
          refreshToken
        );
        res.cookies.set("accessToken", newaccessToken );
        res.cookies.set("refreshToken", newRefreshToken );
        return res;
      } catch (error) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
