import api from '@/lib/axios';
import type {NextRequest} from "next/server";

export async function POST(
    request: NextRequest
) {
    console.log('hi from signin route');
    const {email, password} = await request.json()
    const response = await api.get('/sanctum/csrf-cookie')
        .then(async response => {
            const xsrfToken = getXsrfToken(response.headers['set-cookie'], 'XSRF-TOKEN');
            const laravelSession = getXsrfToken(response.headers['set-cookie'], 'laravel-session');
            return await api.post('/api/login',
                {email, password},
                {
                    headers: {
                        Cookie: `XSRF-TOKEN=${xsrfToken}; laravel-session=${laravelSession}` , // 🔥 forward cookies
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        'X-XSRF-TOKEN': `${decodeURIComponent(xsrfToken)}`,
                        'origin': 'http://localhost:3000',
                        'referer': 'http://localhost:3000/',

                    },
                }).then(response => {
                    console.log(response.data);
                    return {data:response.data, status: 200};
                })
        }).catch(error => {
            console.log(error)
            if(error.response.status === 401){
                return {data:{success: false}, status: 401}
            }
            return error.response;
        })


    return new Response('',{
        status: response.status
    })
}

function getXsrfToken(setCookie: string[] | undefined, cookieName : string): string | null {
    if (!setCookie) return null

    const xsrfCookie = setCookie.find(cookie =>
        cookie.startsWith(`${cookieName}=`)
    )

    if (!xsrfCookie) return null

    return xsrfCookie.split(";")[0].split("=")[1]
}