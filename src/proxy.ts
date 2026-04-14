import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {getSession} from "@/app/lib/sessions";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    let cookie = null

    try{
        cookie = await getSession()
    }catch (e) {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/user')) {

        if (!cookie)
            return NextResponse.redirect(new URL('/auth/signin', request.url));
        else
            return NextResponse.next();
    }

    if (request.nextUrl.pathname == '/') {
        if (!cookie)
            return NextResponse.redirect(new URL('/auth/signin', request.url));
        else
            return NextResponse.redirect(new URL('/user', request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/user/:path*', '/signout', '/'],
}