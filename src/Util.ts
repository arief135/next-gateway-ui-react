export function fetchWithToken(url: string, token: string) {
    return fetch(url, { headers: { 'Authorization': `Bearer ${token}` } })
}