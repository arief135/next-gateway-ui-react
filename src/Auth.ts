import { useState } from "react";

export function useToken() {

    const getToken = () => {
        return localStorage.getItem('token');
    };


    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('token', userToken);
        setToken(userToken);
    };

    const clearToken = () => {
        localStorage.removeItem('token');
        setToken(undefined);
    }

    return {
        setToken: saveToken,
        token,
        clearToken
    }

}