import {
    FlexBox,
    FlexBoxDirection,
    SideNavigation,
    SideNavigationItem,
    Avatar,
    ShellBar
} from "@ui5/webcomponents-react";
import { useToken } from "./Auth";
import { Navigate, Outlet, useNavigate } from "react-router-dom";


export default function Home() {

    const { token, clearToken } = useToken()
    const nav = useNavigate()

    if (!token) {
        return <Navigate to="/Login" />
    }

    const logoffFn = () => {
        clearToken()
        nav('/Login')
    }

    return (
        <FlexBox fitContainer={true} direction={FlexBoxDirection.Column}>
            <ShellBar
                logo={<img src="https://sap.github.io/ui5-webcomponents/assets/images/sap-logo-svg.svg" alt={'SAP Logo'} />}
                primaryTitle="NEXT Gateway Administration"
                profile={<Avatar initials={'UI5'} />}
            />
            <FlexBox
                fitContainer={true}
                direction={FlexBoxDirection.Row}>

                <SideNavigation
                    fixedItems={<><SideNavigationItem icon="history" text="Logoff" onClick={logoffFn} /></>}
                >

                    <SideNavigationItem
                        expanded
                        icon="group"
                        text="Proxy"
                    />
                    <SideNavigationItem
                        expanded
                        icon="group"
                        text="Monitor"
                    />
                    <SideNavigationItem
                        expanded
                        icon="group"
                        text="Users"
                    />

                </SideNavigation>

                <Outlet />

            </FlexBox>
        </FlexBox>
    )
}