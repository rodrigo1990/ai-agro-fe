import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {cookies} from "next/headers";
import {decrypt} from "@/app/lib/sessions";

const isAuthenticated = async (req: NextRequest) => {




}

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const cookie = console.log('cookie again', (await cookies()).get('session')?.value)
    console.log('cookie decrypt',cookie);
    const session = await decrypt(cookie)

    if (!session?.userId)
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    else
        return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/user/:path*',
}