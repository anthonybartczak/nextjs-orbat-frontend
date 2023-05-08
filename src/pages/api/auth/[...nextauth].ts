import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

    async jwt ({ token, user }) {

      if (user?.email) {
        return { ...token, ...user };
      }

      // on subsequent calls, token is provided and we need to check if it's expired
      if (token?.exp) {
        if (Date.now() / 1000 < token?.exp) return { ...token, ...user };
      } else if (token?.refreshToken) return refreshAccessToken(token);

      return { ...token, ...user };
    },

    session ({ session, token }) {
      if (Date.now() / 1000 > token?.exp && token?.refreshTokenExpires && Date.now() / 1000 > token?.refreshTokenExpires) {
        return Promise.reject({
          error: new Error("Refresh token has expired. Please log in again to get a new refresh token."),
        });
      }

      const accessTokenData = JSON.parse(atob(token.access.split(".")?.at(1)));
      session.user = accessTokenData;
      token.accessTokenExpires = accessTokenData.exp;

      session.access = token?.access;

      return Promise.resolve(session);
    },

  },
});