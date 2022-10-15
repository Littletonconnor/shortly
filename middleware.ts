import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function handler(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const pathname = request.nextUrl.pathname.replace(/\//g, "");
  const endpoint = `${origin}/api/shortner/${pathname}`;

  const response = await fetch(endpoint);

  if (response.status === 404) {
    return NextResponse.redirect(origin);
  }

  const data = await response.json();

  return NextResponse.redirect(new URL(data.url));
}

export const config = {
  matcher: "/:slug",
};
