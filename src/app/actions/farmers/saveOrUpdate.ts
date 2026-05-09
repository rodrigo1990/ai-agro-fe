'use server'
import api from "@/lib/axios";
import {createSession, getToken} from "@/app/lib/sessions";

export async function saveOrUpdate(
    farmer: Object,
) {
    const id = farmer.id
    const name = farmer.name
    const lastName = farmer.last_name
    const taxId = farmer.tax_id
    const externalCode = farmer.external_code
    const notes = farmer.notes
    const token = await getToken()

    console.log('farmer saveOrUpdate')
    console.log(farmer);

    const response = await api.post('/api/farmer/saveOrUpdate',
        {
            id:id,
            name:name,
            last_name:lastName,
            tax_id:taxId,
            external_code:externalCode,
            notes:notes
        },
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
        });

    if(response.status == 200)
    {
        return {success: true}
    }


    return {success: false}
}