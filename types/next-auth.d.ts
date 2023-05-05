import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      userName: string;
      email: string;
      role: string;
      accessToken: string;
    };
  }
}