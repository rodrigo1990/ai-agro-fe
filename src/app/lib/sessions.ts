import 'server-only'
import {cookies} from "next/headers";
import {decrypt, encrypt} from "@/app/lib/jwt";



export async function createSession(user: Object, token: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ user, expiresAt })
    token = await encrypt({ token, expiresAt })
    const cookieStore = await cookies()
    cookieStore.set('session', session, {
        httpOnly: false,
        secure: false,
        expires: expiresAt,
        sameSite: 'lax',
    })
    cookieStore.set('bearer-token',token,{
        httpOnly: false,
        secure: false,
        expires: expiresAt,
        sameSite: 'lax',
    })
}

export async function getSession(): Promise<any> {
    return (await decrypt((await cookies()).get('session').value)).user
}

export async function getToken(): Promise<any> {
    return (await decrypt((await cookies()).get('bearer-token').value))
}
