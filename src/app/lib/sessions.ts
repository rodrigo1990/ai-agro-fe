import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import {cookies} from "next/headers";
import {encrypt} from "@/app/lib/jwt";
import {decrypt} from "@/app/lib/jwt";

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)


export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId, expiresAt })
    const cookieStore = await cookies()
    console.log('create session cookie',session);
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/user',
    })
}