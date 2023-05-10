import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';
import jwt_decode from "jwt-decode";

interface accessTokenData {
  token_type: string,
  exp: number,
  iat: number,
  jti: string,
  user_id: number,
  id: number,
  user: string,
  email: string,
}

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "John Doe" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const response = await fetch(process.env.NEXT_PUBLIC_API_SITE + "/api/auth/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const data = await response.json();

        if (response.ok && data?.access) {
          return data;
        }

        return Promise.reject(new Error(data?.errors));
      },
    }),
  ],
  callbacks: {

    async jwt ({ token, user, account }) {

      if (user && account) {
        return { ...token, ...user };
      }

      // on subsequent calls, token is provided and we need to check if it's expired
      if (token?.accessTokenExpires && Math.floor(Date.now() / 1000) >= token?.accessTokenExpires) {
        try {
          // Get a new token using the refresh token
          const res = await axios.post(process.env.NEXT_PUBLIC_API_SITE + '/api/token/refresh/', {
            refresh: token.refresh,
          });

          // Return the new token
          return {
            ...token,
            access: res.data.access,
            refresh: res.data.refresh,
            accessTokenExpires: Math.floor(Date.now() / 1000) + res.data.exp,
          };
        } catch (err) {
          console.log(err);
        }
      }

      return { ...token, ...user };
    },

    session ({ session, token }) {
      if (token.exp && Date.now() / 1000 > token?.exp && token?.refreshTokenExpires && Date.now() / 1000 >= token?.refreshTokenExpires) {
        return Promise.reject({
          error: new Error("Refresh token has expired. Please log in again to get a new refresh token."),
        });
      }

      const accessTokenData = jwt_decode<accessTokenData>(token.access);

      session.user = accessTokenData;
      token.accessTokenExpires = accessTokenData.exp;

      session.access = token?.access;

      return Promise.resolve(session);
    },

  },
});