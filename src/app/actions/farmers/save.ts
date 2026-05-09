'use server'
import api from "@/lib/axios";
import {createSession, getToken} from "@/app/lib/sessions";

export async function save(
    farmer: Object,
) {
    const name = farmer.name
    const tax_id = farmer.tax_id
    const token = await getToken()

    const response = await api.post('/api/farmer/save',
        {business_name:name, tax_id:tax_id},{
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
        });

    if(response.status == 200)
    {
        return {success: true}
    }


    return {success: false}
}