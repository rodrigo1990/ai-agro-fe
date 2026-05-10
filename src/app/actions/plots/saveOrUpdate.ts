'use server'
import api from "@/lib/axios";
import {getToken} from "@/app/lib/sessions";

export async function saveOrUpdate(plot: Object) {
    const token = await getToken()

    const response = await api.post('/api/plot/saveOrUpdate',
        plot,
        {
            headers: {
                'Authorization': 'Bearer ' + token.token,
            }
        })
        .then(res => res)
        .catch(error => error.response);

    if (response.status === 200) {
        return { success: true, content: response.data }
    }

    return { success: false }
}
