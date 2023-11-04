import axios from "axios"

export function fetchWithToken(url: string, token: string) {
    return fetch(url, { headers: { 'Authorization': `Bearer ${token}` } })
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