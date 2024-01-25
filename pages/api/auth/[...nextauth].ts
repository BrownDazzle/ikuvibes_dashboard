import NextAuth, { Account, DefaultSession, Profile, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { CreateUserParams } from "@/types/index";
import { SafeUser } from "@/types";
import { createUser, getUserByEmail, getUserById } from "@/lib/actions/user.actions";

interface ExtendedUser extends User {
  accessToken?: string;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session.user) {
        const sessionUser: ExtendedUser | null = await getUserByEmail(session.user.email ?? "");

        if (!sessionUser) {
          const registeredUser = await createUser(session.user as CreateUserParams);
          if (registeredUser) {
            session.user.id = registeredUser.id;
          }
        } else {
          session.user.id = sessionUser.id;
        }
      }
      return session;
    },
    async signIn({
      user,
      account,
      profile,
    }: {
      user: ExtendedUser;
      account: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, unknown>;
    }): Promise<boolean> {

      try {
        const userExist = await getUserByEmail(profile?.email ?? "");
        console.log("PROFILE_User", userExist)
        if (!userExist) {
          const registeredUser = await createUser(profile as CreateUserParams);

        }

        // Extract the access token from the Google account
        const accessToken = account?.accessToken;

        // Save the access token to the session.user object
        if (typeof accessToken === 'string') {
          user.accessToken = accessToken;
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
  secret: process.env.AUTH_SECRET,
});

export default handler;
