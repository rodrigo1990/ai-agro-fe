import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {cookies} from "next/headers";
import {decrypt} from "@/app/lib/jwt";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)
    if (!session?.user)
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    else
        return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/user/:path*',
}