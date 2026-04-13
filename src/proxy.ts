import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {getSession} from "@/app/lib/sessions";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const cookieStore = request.cookies
    if (request.nextUrl.pathname.startsWith('/user')) {
        let cookie = null
        try{
            cookie = await getSession()
        }catch (e) {
            console.log(e)
            return NextResponse.redirect(new URL('/auth/signin', request.url));
        }
        console.log('proxy user path: '+cookie.name)
        console.log(cookieStore.get('session'))
        if (!cookie)
            return NextResponse.redirect(new URL('/auth/signin', request.url));
        else
            return NextResponse.next()
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/user/:path*', '/signout'],
}