import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import api from "@/lib/axios";
import {cookies} from "next/headers";

const isAuthenticated = async (xsrfToken?: string, laravelSession?: string) => {
    return await api.get('/api/user', {
        headers: {
            Cookie: `XSRF-TOKEN=${xsrfToken}; laravel-session=${laravelSession}` , // 🔥 forward cookies
            "Accept": "application/json",
            "Content-Type": "application/json",
            'X-XSRF-TOKEN': `${decodeURIComponent(xsrfToken)}`,
            'origin': 'http://localhost:3000',
            'referer': 'http://localhost:3000/',

        },
    }).then(async response => {
        if(response.status === 200){
            return true;
        }
    }).catch(error => {
        return false;
    });
}

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const cookieStore = await cookies()
    const xsrfToken = cookieStore.get('XSRF-TOKEN')?.value
    const laravelSession = cookieStore.get('laravel-session')?.value


    if (await isAuthenticated(xsrfToken, laravelSession))
        return NextResponse.next()
    else
        return NextResponse.redirect(new URL('/signin', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/user/:path*',
}