import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    refreshTokenExpires?: number;
    exp?: string;
    refresh?: string;
    access?: string;
    error?: string;
    user?: User;
  }

  interface User {
    id?: string;
    user: string;
    email?: string | null;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    refreshTokenExpires?: number;
    accessTokenExpires?: number;
    refresh?: string;
    access: string;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}