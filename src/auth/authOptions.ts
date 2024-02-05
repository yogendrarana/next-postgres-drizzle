import { db } from "@/db/db";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { NextAuthOptions } from "next-auth";
// import { DrizzleAdapter } from "@auth/drizzle-adapter";
import CredentialProvider from "next-auth/providers/credentials";

// import schema
import { userSchema } from "@/db/schema/user.schema";

export const authOptions: NextAuthOptions = {
    // adapter: DrizzleAdapter(db),

    providers: [
        CredentialProvider({
            name: "credentials",

            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },

            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) throw new Error("Please, enter the required fields.");

                    const [user] = await db.select().from(userSchema).where(eq(userSchema.email, credentials.email));
                    if (!user) throw new Error("Invalid credentials! Please, try again.");

                    const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);
                    if (!isCorrectPassword) throw new Error("Invalid credentials! Please, try again.");

                    return user as any;

                } catch (err: any) {
                    console.error('Authorization error:', err.message);
                    return null;
                }
            }
        })
    ],

    callbacks: {
        // Using the `...rest` parameter to be able to narrow down the type based on `trigger`
        async jwt({ token, trigger, session }) {
            if (trigger === "update" && session?.email) {
                token.email = session.email;
            }

            return token
        },

        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl
        }
    },

    pages: { signIn: "/login" },
    session: { strategy: 'jwt' },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
}