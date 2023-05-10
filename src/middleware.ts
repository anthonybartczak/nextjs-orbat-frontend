import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

    const { pathname, origin } = request.nextUrl

    const token = await getToken({req: request});

    if (!token) {
      return NextResponse.redirect(`${origin}/login`);
    };

    //console.log("Token: ", token?.accessTokenExpires)

    //redirect user without access to login
    if (token?.accessTokenExpires && token?.access && Date.now() / 1000 >= token?.accessTokenExpires) {
      console.log("Redirecting...");
      return NextResponse.redirect(`${origin}/login`);
    };

    // redirect user without admin access to login
    // if (!token?.isAdmin) {
    //   return NextResponse.redirect(`${origin}/login`);
    // }

    return NextResponse.next();
}

export const config = {
    matcher: '/create',
};