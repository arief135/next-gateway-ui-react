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

            <Title style={{marginBottom: '30px'}}>Sign In</Title>
            <Input
                style={{marginBottom: '10px'}}
                icon={<Icon name="account" />}
                placeholder="Username"
            />
            <Input
                style={{marginBottom: '10px'}}
                icon={<Icon name="key" />}
                placeholder="Password"
                type="Password"
            />

            <Button design="Emphasized" style={{ width: '210px' }}>Login</Button>

        </FlexBox>
    )
}