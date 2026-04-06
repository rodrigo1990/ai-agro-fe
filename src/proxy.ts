import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import api from "@/lib/axios";

const isAuthenticated = async (xsrfToken?: string, laravelSession?: string) => {
    const res = await api.get('/api/user', {
        headers: {
            Cookie: `XSRF-TOKEN=${xsrfToken}; laravel-session=${laravelSession}` , // 🔥 forward cookies
            "Accept": "application/json",
            "Content-Type": "application/json",
            'X-XSRF-TOKEN': `${xsrfToken}`,
            'origin': 'http://localhost:3000',
            'referer': 'http://localhost:3000/',
            'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="124", "Chromium";v="124"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',

        },
    }).then(async response => {
        if(response.status === 200){
            return true;
        }
    }).catch(error => {
        return false;
    });
    return res;
}

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const xsrfToken = request.cookies.get('XSRF-TOKEN')?.value
    const laravelSession = request.cookies.get('laravel-session')?.value
    if (await isAuthenticated(xsrfToken, laravelSession))
        return NextResponse.next()
    else
        return NextResponse.redirect(new URL('/signin', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/user/:path*',
}