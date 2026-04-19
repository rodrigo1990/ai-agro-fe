'use server'
import api from "@/lib/axios";
import {createSession, getToken} from "@/app/lib/sessions";

export async function post(producer: Object,) {
    const token = await getToken()
    console.log(token);
    const response = await api.post('/api/farmers/save',
        producer,
        {
            headers: {
                'Authorization': 'Bearer '+token.token,
            }
        })
        .then(res => {
            console.log(res.data);
            return res;
        })
        .catch(error => {
            console.log(error);
            return error.response;
        })

    if(response.status == 200)
    {
        return {success: true, content: response.data}
    }

    return {success: false}
}