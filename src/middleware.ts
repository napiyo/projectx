import { log } from "console";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("token");
  // console.log("request", request.nextUrl.pathname);

  // console.log("cookie", cookie);

  // const paths = ["/dashboard", "/flowbuilder", "/privateReply", "/settings"];
  // if (request.nextUrl.pathname === "/signup" && cookie) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // } else if (request.nextUrl.pathname == "/") {
  //   if (cookie) {
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   } else {
  //     return NextResponse.redirect(new URL("/signup", request.url));
  //   }
  // } else if (paths.some((path) => request.nextUrl.pathname.includes(path))) {
  //   if (cookie) {
  //     return NextResponse.next();
  //   } else {
  //     return NextResponse.redirect(new URL("/signup", request.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/flowbuilder",
    "/privateReply",
    "/settings",
    "/signup",
  ],
};
