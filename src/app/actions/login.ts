'use server'
import api from "@/lib/axios";
import {createSession} from "@/app/lib/sessions";

export async function login(
    email: string,
    password: string,
) {
    const response = await api.post('/api/login',
        {email, password})
        .then(res => {
            console.log(res.data.token);
            console.log(res.data.user);
            return res;
        })
        .catch(error => {
            console.log(error);
        })

    if(response.status == 200)
    {
        await createSession(response.data.user, response.data.token)
        return {success: true}
    }


    return {success: false}
}