import {post} from "@/app/actions/farmers/post";
import {getToken} from "@/app/lib/sessions";

export async function POST(request: Request) {
    console.log('farmers api called')
    const token = await getToken()
    console.log(token);
    const res = await request.json()
    console.log(res)
    const farmer = await post(res)
    console.log(farmer)
    return Response.json({ content:true })
}