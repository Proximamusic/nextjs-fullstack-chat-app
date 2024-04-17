import Users from "@models/Users";
import { connectToDatabase } from "@mongodb";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        if (!credentials.email) {
          throw new Error("Email is required");
        }
        if (!credentials.password) {
          throw new Error("Password is required");
        }

        await connectToDatabase();
        const user = await Users.findOne({ email: credentials.email });
        if (!user || !user?.password) {
          throw new Error("Invalid email or password");
        }
        const isMatch = await compare(credentials.password, user.password);
        if (!isMatch) {
          throw new Error("Incorrect password");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const mongoDBUser = await Users.findOne({ email: session.user.email });
      session.user.id = mongoDBUser._id.toString();
      session.user = { ...session.user, ...mongoDBUser._doc };
      delete session.user.id;
      delete session.user.password;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
