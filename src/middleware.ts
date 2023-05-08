import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

    const { pathname, origin } = request.nextUrl

    const token = await getToken({
      req: request,
      secret: process?.env?.NEXTAUTH_SECRET,
    });

    // if (token?.access && Date.now() / 1000 < token?.exp) {
    //   console.log("Now", Date.now() / 1000 )
    //   console.log("Exp", token.exp)
    // }

    // redirect user without access to login
    // if (token?.access && token?.access && Date.now() / 1000 < token.exp) {
    //   console.log("Redirecting...")
    //   return NextResponse.redirect(`${origin}/login`);
    // }

    // redirect user without admin access to login
    // if (!token?.isAdmin) {
    //   return NextResponse.redirect(`${origin}/login`);
    // }

    return NextResponse.next();
}

export const config = {
    matcher: '/platoons/create/:path*',
};