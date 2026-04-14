'use server'
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import api from "@/lib/axios";
import {getToken} from "@/app/lib/sessions";

export async function logout() {
    const cookieStore = await cookies()
    const token = await getToken()
    cookieStore.delete('session')

    const response = await api.post('/api/signout', {}, {
        headers: {
            'Authorization': 'Bearer '+token.token,
        }
    })

    if (response.status === 200) {
        cookieStore.delete('bearer-token')
        redirect('/auth/login')
    }
}
