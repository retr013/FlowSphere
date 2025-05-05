import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma/client"
import Credentials from "@auth/core/providers/credentials";
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google,
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                const email = credentials?.email as string;
                const password = credentials?.password as string;

                if (!email || !password) return null;

                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user || !user.password) {
                    throw new Error("Invalid credentials");
                }

                const isValid = await bcrypt.compare(password, user.password);

                if (!isValid) {
                    throw new Error("Invalid credentials");
                }

                return user;
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.sub!;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        },
    },
})
