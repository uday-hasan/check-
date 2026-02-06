import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.BETTER_AUTH_SECRET || "AALHVOxzaFu6YA1Fx4PxKMRc2EzKCG9H",
  baseURL:
    process.env.BETTER_AUTH_URL || "https://check-mocha-three.vercel.app",
  trustedOrigins: [
    "https://check-front-pi.vercel.app",
    process.env.APP_URL || "https://check-front-pi.vercel.app",
    "http://localhost:3000",
  ],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  advanced: {
    cookiePrefix: "better-auth",
    cookieSameSite: "none",
    useSecureCookies: true,
  },

  //  Logout is implemented on the client side
});
