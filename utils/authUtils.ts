// utils/authCookies.js

import Cookies from "universal-cookie";
import { jwtVerify } from "jose";

const cookies = new Cookies();

export function setAuthCookies(accessToken: string, refreshToken: string) {
  cookies.set("accessToken", accessToken, { maxAge: 1 * 60 }); 
  cookies.set("refreshToken", refreshToken, { maxAge: 7 * 24 * 60 * 60 });
}
export function clearAuthCookies() {
  cookies.remove("accessToken"); 

  cookies.remove("refreshToken");
}

export async function getAccessToken() {
  return await cookies.get("accessToken");
}

export async function getRefreshToken() {
  return await cookies.get("refreshToken");
}

export async function isAccessTokenValid(
  accessToken: string
): Promise<boolean> {
  if (!accessToken) {
    return false;
  }
  try {
    const secret = new TextEncoder().encode(
      "5bc388647e66d4ba555630ba909e77549955186c3dce931a6510fa09842425f2"
    );
    const decodedToken = await jwtVerify(accessToken, secret);
    if (
      decodedToken.payload.exp &&
      new Date().getTime() < new Date(decodedToken.payload.exp).getTime()
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

export async function refreshTokens(refreshToken: string) {
  const response = await fetch(`${process.env.BASE_URL}/api/auth/refresh-token`, {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return {
    newaccessToken: data.accessToken,
    newRefreshToken: data.refreshToken,
  };
}
