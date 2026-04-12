'use server'
import {cookies} from "next/headers";
import {decrypt} from "@/app/lib/jwt";
import {getSession} from "@/app/lib/sessions";

export async function auth(): Promise<any> {
    return await getSession()
}