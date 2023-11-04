import { Button, FlexBox, FlexBoxDirection, Icon, Input, Title, Toast } from "@ui5/webcomponents-react";
import axios from "axios";
import { useToken } from "./Auth";
import { Navigate } from "react-router-dom";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js"
import "@ui5/webcomponents-icons/dist/account.js"
import "@ui5/webcomponents-icons/dist/key.js"
import { useRef } from "react";

export default function Login() {

    const { token, setToken } = useToken()
    const toast = useRef(null)

    if (token) {
        return <Navigate to="/" />
    }

    const onLogin = async (e) => {
        e.preventDefault()

        const u = document.getElementById('username') as any
        const p = document.getElementById('password') as any

        try {
            const res = await axios.post('/api/auth/login', {
                username: u.value,
                password: p.value
            })

            if (res.data) {
                setToken(res.data.access_token)
            }
        } catch (error) {
            toast.current.innerHTML = error
            toast.current.show()
        }
    }

    return (
        <form onSubmit={onLogin}>
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

                <Button type="Submit" design="Emphasized" style={{ width: '210px' }}>Login</Button>
                <Toast ref={toast}></Toast>
            </FlexBox>
        </form>
    )
}