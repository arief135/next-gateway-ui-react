import axios from "axios"

export async function fetchWithToken(url: string, token: string) {
    const result = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } })
    if (result.status == 401) {
        throw result
    } else {
        return result
    }
}

export function postWithToken(url: string, token: string, data: any) {
    return axios.post(
        url,
        data,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
}