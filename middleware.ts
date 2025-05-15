import { auth } from "@/auth";
import { NextResponse } from "next/server";

const protectedRoutes = ['/issues/new'];
const publicRoutes = ['/auth/signin', '/issues'];

export default auth((req) => {
    const { nextUrl } = req;
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);

    if (isProtectedRoute && !req.auth) {
        const callbackUrl = nextUrl.pathname;
        return NextResponse.redirect(new URL(`/auth/signin?callbackUrl=${callbackUrl}`, nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/issues/new", "/issues/edit/:path*", "/api/:path*"],
};

