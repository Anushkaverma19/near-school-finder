import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb-client";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({

  debug: true, // 👈 यह line add करो

  adapter: MongoDBAdapter(clientPromise),

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  trustHost: true,

  secret: process.env.AUTH_SECRET,

  session: {
    strategy: "database",
  },

  pages: {
    signIn: "/",
  },

  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});