import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    // GoogleProvider({
    //   clientId: process.env.NEXT_GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET as string,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email:",
          type: "email",
          placeholder: "Enter Username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        console.log("User trying to login:", credentials)
        const user = { id: "42", email: process.env.NEXT_SECRET_EMAIL, password: process.env.NEXT_SECRET_PASSWORD };

        
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing credentials");
        }
    
        if (credentials.username === user.email && credentials.password === user.password) {
          return user; // 👈 Agar credentials match ho gaye to user return karo
        } else {
          console.log("Invalid credentials provided"); // 👈 Debugging ke liye add karo
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
};