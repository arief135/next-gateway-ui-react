import { Button, FlexBox, FlexBoxDirection, Icon, Input, Title } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/account.js"
import "@ui5/webcomponents-icons/dist/key.js"
import { useQuery } from "react-query";
import { useState } from "react";

export default function Login() {

    const { data, refetch } = useQuery(
        'login',
        () => {
            const username = ''
            const password = ''

            return fetch('/api/auth/login',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        'username': username,
                        'password': password
                    })
                })
                .then(res => res.json())
        },
        { enabled: false }
    )

    const onLoginClick = () => {
        refetch()
        console.log(data)
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
                value=""
            />
            <Input
                style={{ marginBottom: '10px' }}
                icon={<Icon name="key" />}
                placeholder="Password"
                type="Password"
            />

            <Button design="Emphasized" style={{ width: '210px' }} onClick={onLoginClick}>Login</Button>

        </FlexBox>
    )
}