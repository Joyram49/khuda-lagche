import bcrypt from "bcryptjs";
import NextAuth, { AuthError } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import { User } from "./models/user-model";

import { getNewTokens } from "./lib/getNewTokens";
import { refreshAccessToken } from "./lib/refreshAccessToken";

class customError extends AuthError {
  constructor(message) {
    super();
    this.message = message;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          // Find the user based on the email provided
          const user = await User.findOne({ email: credentials.email }).lean();
          if (!user) {
            throw new Error("Invalid email or password");
          }

          // Compare the entered password with the stored password hash
          const isPasswordMatch = await bcrypt.compare(
            credentials.password,
            user?.password
          );
          if (!isPasswordMatch) {
            throw new Error("Invalid email or password");
          }

          // Return the user object if authentication is successful
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        } catch (error) {
          // Log and throw the error to be caught in the calling function
          throw new customError(error.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.AUTH_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.AUTH_FACEBOOK_CLIENT_SECRET,
    }),
  ],
  trustHost: true,

  callbacks: {
    async signIn({ user, account, profile, credentials, email }) {
      if (account.provider === "google" || account.provider === "facebook") {
        const role = account?.role || "customer";
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              name: user.name,
              password: "sample password",
              role,
            });
            await newUser.save();
          }
          return true;
        } catch (error) {
          console.error("Error saving user to the database:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, account, profile, session }) {
      const currentTime = Math.floor(Date.now() / 1000);
      const accessTokenExpirationTime = 60 * 60;
      const refreshTokenExpirationTime = 24 * 60 * 60;
      // First time logging in (account and user exist)
      if (user && account) {
        // For credentials login
        if (account.provider === "credentials") {
          const newToken = await getNewTokens({
            userId: user._id.toString(),
            name: user.firstName + user.lastName,
            email: user.email,
          });

          return {
            ...token,
            access_token: newToken?.accessToken,
            refresh_token: newToken?.refreshToken,
            expires_at: currentTime + accessTokenExpirationTime,
            refreshTokenExpires: currentTime + refreshTokenExpirationTime,
            provider: account.provider,
            user,
          };
        }

        // For social login (Google, Facebook, etc.)
        const existingUser = await User.findOne({ email: user.email });
        user.role = existingUser?.role || "customer";
        return {
          ...token,
          access_token: account?.id_token,
          refresh_token: account?.refresh_token,
          expires_at: currentTime + accessTokenExpirationTime,
          refreshTokenExpires: currentTime + refreshTokenExpirationTime,
          provider: account.provider,
          user,
        };
      }

      // Token refresh: Check if the access token has expired
      if (Date.now() / 1000 > token?.expires_at) {
        const refreshedToken = await refreshAccessToken(token);
        console.log(
          "Access token has expired, refreshedTokens...",
          refreshedToken
        );
        return {
          ...refreshedToken,
          refreshTokenExpires: currentTime + refreshTokenExpirationTime,
        };
      }
      return token;
    },

    async session({ session, token }) {
      const date = new Date(token?.expires_at * 1000);
      const options = {
        timeZone: "Asia/Dhaka",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };

      if (token) {
        session.user = token?.user;
        session.error = token?.error || null;
        session.expires = new Intl.DateTimeFormat("en-US", options).format(
          date
        );
      }

      return session;
    },
  },
});
