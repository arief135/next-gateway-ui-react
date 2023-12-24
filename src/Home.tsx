import {
    FlexBox,
    FlexBoxDirection,
    SideNavigation,
    SideNavigationItem,
    Avatar,
    ShellBar,
    Ui5CustomEvent,
    SideNavigationDomRef
} from "@ui5/webcomponents-react"
import { useToken } from "./Auth"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import "@ui5/webcomponents-icons/dist/log.js"
import "@ui5/webcomponents-icons/dist/internet-browser.js"
import "@ui5/webcomponents-icons/dist/performance.js"
import "@ui5/webcomponents-icons/dist/user-edit.js"
import { SideNavigationSelectionChangeEventDetail } from "@ui5/webcomponents-fiori/dist/SideNavigation"


export default function Home() {

    const { token, clearToken } = useToken()
    const nav = useNavigate()

    if (!token) {
        return <Navigate to="/login" />
    }

    const logoffFn = () => {
        clearToken()
        nav('/login')
    }

    const selectItem = (e: Ui5CustomEvent<SideNavigationDomRef, SideNavigationSelectionChangeEventDetail>) => {
        switch (e.detail.item.id) {
            case 'proxy':
                nav('/proxies')
                break;

            case 'monitor':
                // nav('/monitor')
                break;

            case 'users':
                nav('/users')
                break;

            default:
                break;
        }
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
                    fixedItems={<><SideNavigationItem icon="log" text="Logoff" onClick={logoffFn} /></>}
                    onSelectionChange={selectItem}
                >

                    <SideNavigationItem
                        expanded
                        id="proxy"
                        icon="internet-browser"
                        text="Proxy"
                    />
                    <SideNavigationItem
                        expanded
                        id="monitor"
                        icon="performance"
                        text="Monitor"
                    />
                    <SideNavigationItem
                        expanded
                        id="users"
                        icon="user-edit"
                        text="Users"
                    />

                </SideNavigation>

                <Outlet />

            </FlexBox>
        </FlexBox>
    )
}