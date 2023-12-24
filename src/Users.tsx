import {
    DynamicPage,
    DynamicPageTitle,
    Button,
    Title,
    Label,
    Table,
    TableCell,
    TableColumn,
    TableRow,
    FormGroup,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Breadcrumbs,
    BreadcrumbsItem,
    Toast
} from "@ui5/webcomponents-react";
import { useMutation, useQuery } from "react-query";
import { useToken } from "./Auth";
import { fetchWithToken, postWithToken } from "./Util";
import { Navigate, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";

function UserTable() {

    const { token } = useToken()

    const query = useQuery({
        queryKey: 'users',
        queryFn: () => fetchWithToken('/api/users', token as string).then(e => e.json())
    })

    if (query.isSuccess) {
        return (
            <Table
                columns={
                    <>
                        <TableColumn style={{ width: '12rem' }}>
                            <Label>Name</Label>
                        </TableColumn>
                        <TableColumn minWidth={800} popinText="Supplier">
                            <Label>Username</Label>
                        </TableColumn>
                        <TableColumn demandPopin minWidth={600} popinText="Dimensions">
                            <Label>Email</Label></TableColumn>
                        <TableColumn demandPopin minWidth={600} popinText="Weight">
                            <Label>Active</Label>
                        </TableColumn>
                        <TableColumn>
                            <Label>Last Logged In</Label>
                        </TableColumn>
                    </>}
            >
                {query.data.data.map((e: any) =>
                    <TableRow key={e.username}>
                        <TableCell>
                            <Label>
                                {e.firstName + ' ' + e.lastName}
                            </Label>
                        </TableCell>
                        <TableCell>
                            <Label>
                                {e.username}
                            </Label>
                        </TableCell>
                        <TableCell>
                            <Label>
                                {e.email}
                            </Label>
                        </TableCell>
                        <TableCell>
                            <Label>
                                {e.active}
                            </Label>
                        </TableCell>
                        <TableCell>
                            <Label>
                                {e.lastLoggedIn}
                            </Label>
                        </TableCell>
                    </TableRow>
                )}
            </Table>
        )
    }

}

function UserCreate() {

    const navigate = useNavigate()

    const breadcrumbClick = (e: CustomEvent) => {
        if (e.detail.item.id) {
            navigate('/proxies')
        }
    }

    const endpointPrefix = '/api/run/'
    const [ readyToSave, setReadyToSave ] = useState(false)
    const [ endpoint, setEndpoint ] = useState(endpointPrefix)
    const { token } = useToken()

    const testConnection = async (e: any) => {
        const formData = getFormData()

        const targetURL = formData.targetURL
        const username = formData.credentialName
        const password = formData.credentialPassword
        const ignoreCert = true
        const currentToast: any = toast.current

        try {
            const res = await axios.create().post('/api/run/test_connection', {
                targetURL,
                username,
                password,
                ignoreCert
            })

            // const res = await new Axios().post('/api/run/test_connection', {
            //     targetURL,
            //     username,
            //     password,
            //     ignoreCert
            // })

            console.log(res)
            console.log(toast.current)
            // debugger

            // toast.current.setHTML(res.statusText)
            currentToast.innerHTML = res.statusText

            setReadyToSave(true)

        } catch (err) {
            // toast.current.setHTML(err)
            currentToast.innerHTML = err
            setReadyToSave(false)
        }

        currentToast.show()
    }

    const getElement = (id: string) => document.getElementById(id) as any

    const getFormData = () => {
        const name = getElement('name').value
        const endpoint = getElement('endpoint').value
        const targetURL = getElement('targetURL').value
        const credential = getElement('credential').selectedOption.value
        const credentialName = getElement('credentialName').value
        const credentialPassword = getElement('credentialPassword').value

        return {
            name, endpoint, targetURL, credential, credentialName, credentialPassword
        }
    }

    const onNameChanged = (val: string) => {
        setEndpoint(endpointPrefix + val)
    }

    const toast = useRef(null)

    const proxyMutation = useMutation({
        mutationFn: (data: any) => {
            return postWithToken('/api/proxies', token as string, data)
        }
    })

    const submitForm = (e: any) => {
        e.preventDefault()

        if (!readyToSave) {
            return
        }

        const formData = getFormData()
        proxyMutation.mutate({
            name: formData.name,
            alias: formData.name,
            targetURL: formData.targetURL,
            status: 'ACTIVE',
            credentialInfo: {
                credentialType: 1
            },
            credentialProperties: [
                {
                    name: "USERNAME",
                    value: formData.credentialName
                },
                {
                    name: "PASSWORD",
                    value
                        : formData.credentialPassword
                }
            ]
        })
    }

    if (proxyMutation.isSuccess) {
        return <Navigate to='/proxies' />
    }

    return (
        <div style={{ width: '100%', margin: '0 40px' }}>
            <Breadcrumbs onItemClick={breadcrumbClick}>
                <BreadcrumbsItem id="proxies">
                    Proxies
                </BreadcrumbsItem>
                <BreadcrumbsItem>
                    Create
                </BreadcrumbsItem>
            </Breadcrumbs>
            <div style={{ marginBottom: '30px' }}></div>

            <Form
                backgroundDesign="Solid"
                style={{
                    alignItems: 'left'
                }}
                titleText="Create New Proxy"
                columnsXL={1}
                onSubmit={submitForm}
            >
                <FormItem label="Name">
                    <Input
                        id='name'
                        onInput={(e) => onNameChanged(e.target.value as string)} />
                </FormItem>
                <FormItem label="Endpoint">
                    <Input id='endpoint' readonly={true} value={endpoint} />
                </FormItem>
                <FormItem label='Target URL'>
                    <Input id='targetURL' />
                </FormItem>
                <FormItem label="Credential" >
                    <Select id="credential">
                        <Option value="1">
                            Basic Auth
                        </Option>
                    </Select>
                </FormItem>

                <FormGroup titleText="Credential Details">
                    <FormItem label="User Name">
                        <Input id='credentialName' />
                    </FormItem>
                    <FormItem label='Paswords'>
                        <Input type="Password" id='credentialPassword' />
                    </FormItem>
                </FormGroup>

                <Button style={{ width: '120px' }} onClick={testConnection}>Test Connection</Button>

                <FormItem>
                    <Button type="Submit" style={{ width: '120px' }} disabled={!readyToSave}>Save</Button>
                </FormItem>

            </Form>

            <Toast ref={toast}></Toast>
        </div>
    )
}

function UserDisplay() {

    const navigate = useNavigate()

    return (
        <DynamicPage
            headerTitle={
                <DynamicPageTitle
                    actions={
                        <>
                            <Button design="Emphasized" onClick={() => navigate('/proxies/create')}>Create</Button>
                        </>}
                    header={<Title>Users</Title>} >

                </DynamicPageTitle>}
            showHideHeaderButton={false}
        >

            <UserTable />

        </DynamicPage>
    )
}

interface UserProp {
    mode: 'CRE' | 'DIS' | 'UPD'
}

export default function Users({ mode = 'DIS' }: UserProp) {
    switch (mode) {
        case 'CRE':
            return <UserCreate />

        default:
            return <UserDisplay />
    }
}