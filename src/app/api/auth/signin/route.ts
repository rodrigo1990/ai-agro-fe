import api from '@/lib/axios';
import type {NextRequest} from "next/server";
import {createSession} from "@/app/lib/sessions";

export async function POST(
    request: NextRequest
) {
    console.log('hi from signin route');
    const {email, password} = await request.json()
    const response = await api.post('/api/login',
        {email, password})
        .then(res => {
            console.log(res.data.token);
            console.log(res.data.user_id);
            return res;
        })
        .catch(error => {
            console.log(error);
        })

    if(response.status == 200)
    {
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        createSession(response.data.user_id)
    }


    return new Response('',{
        status: response.status
    })
}

