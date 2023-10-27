import { Button, FlexBox, FlexBoxDirection, Icon, Input, Title } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/account.js"
import "@ui5/webcomponents-icons/dist/key.js"
import { useMutation } from "react-query";
import { useState } from "react";
import axios from "axios";
import { useToken } from "./Auth";
import { Navigate, useNavigate, useNavigation } from "react-router-dom";

export default function Login() {

    const nav = useNavigate()

    const { token, setToken } = useToken()

    if (token) {
        return <Navigate to="/" />
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginMutation = useMutation({
        mutationFn: (loginData: { username: string, password: string }) => axios.post('/api/auth/login', loginData)
    })

    if (loginMutation.isSuccess) {
        setToken(loginMutation.data.data.access_token)
        nav('/')
    }

    const onLoginClick = () => {
        loginMutation.mutate({ username, password })
    }

    return (
        <FlexBox
            direction={FlexBoxDirection.Column}
            alignItems="Center"
            justifyContent="Center"
            style={{ height: '600px' }}
        >

            <Title style={{ marginBottom: '30px' }}>Sign In</Title>
            <Input
                style={{ marginBottom: '10px' }}
                icon={<Icon name="account" />}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                style={{ marginBottom: '10px' }}
                icon={<Icon name="key" />}
                placeholder="Password"
                type="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button design="Emphasized" style={{ width: '210px' }} onClick={onLoginClick}>Login</Button>

        </FlexBox>
    )
}