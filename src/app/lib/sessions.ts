import 'server-only'
import {cookies} from "next/headers";
import {encrypt} from "@/app/lib/jwt";



export async function createSession(user: Object, token: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ user, expiresAt })
    const cookieStore = await cookies()
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/user',
    })
    cookieStore.set('bearer-token',token,{
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/user',
    })
}