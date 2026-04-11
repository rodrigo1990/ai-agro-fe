'use server'
import {cookies} from "next/headers";
import {decrypt} from "@/app/lib/jwt";

export async function authUser(): Promise<any> {
    console.log('authUser')
    console.log((await cookies()).get('session').value)
    return (await decrypt((await cookies()).get('session').value)).user
}