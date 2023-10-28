import { Button, FlexBox, FlexBoxDirection, Icon, Input, Title } from "@ui5/webcomponents-react";
import { useMutation } from "react-query";
import axios from "axios";
import { useToken } from "./Auth";
import { Navigate, useNavigate } from "react-router-dom";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js"
import "@ui5/webcomponents-icons/dist/account.js"
import "@ui5/webcomponents-icons/dist/key.js"
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element";

export default function Login() {

    const nav = useNavigate()

    const { token, setToken } = useToken()

    if (token) {
        return <Navigate to="/" />
    }

    const loginMutation = useMutation({
        mutationFn: (loginData: { username: string, password: string }) => axios.post('/api/auth/login', loginData)
    })

    if (loginMutation.isSuccess) {
        setToken(loginMutation.data.data.access_token)
        nav('/')
    }

    const onLoginClick = (e) => {
        e.preventDefault()

        const u = document.getElementById('username') as any
        const p = document.getElementById('password') as any
        loginMutation.mutate({
            username: u.value,
            password: p.value
        })
    }

    return (
        <form onSubmit={onLoginClick}>
            <FlexBox
                direction={FlexBoxDirection.Column}
                alignItems="Center"
                justifyContent="Center"
                style={{ height: '600px' }}
            >

                <Title style={{ marginBottom: '30px' }}>Sign In</Title>
                <Input
                    id='username'
                    style={{ marginBottom: '10px' }}
                    icon={<Icon name="account" />}
                    placeholder="Username"
                />
                <Input
                    id='password'
                    style={{ marginBottom: '10px' }}
                    icon={<Icon name="key" />}
                    placeholder="Password"
                    type="Password"
                />

                <Button design="Emphasized" style={{ width: '210px' }} onClick={onLoginClick}>Login</Button>

            </FlexBox>
        </form>
    )
}