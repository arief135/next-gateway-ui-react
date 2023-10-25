import { Button, FlexBox, FlexBoxDirection, Icon, Input, Title } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/account.js"
import "@ui5/webcomponents-icons/dist/key.js"

export default function Login() {
    return (
        <FlexBox
            direction={FlexBoxDirection.Column}
            alignItems="Center"
            justifyContent="Center"
            style={{ height: '600px' }}
        >

            <Title>Login</Title>
            <Input
                icon={<Icon name="account" />}
                placeholder="Username"
            />
            <Input
                icon={<Icon name="key" />}
                placeholder="Password"
                type="Password"
            />

        </FlexBox>
    )
}