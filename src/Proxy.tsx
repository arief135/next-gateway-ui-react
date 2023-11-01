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
    CheckBox,
    Form,
    FormItem,
    Input,
    Link,
    Select,
    Option,
    Text,
    TextArea,
    Breadcrumbs,
    BreadcrumbsItem
} from "@ui5/webcomponents-react";
import { useQuery } from "react-query";
import { useToken } from "./Auth";
import { fetchWithToken } from "./Util";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ProxyTable() {

    const { token } = useToken()

    const query = useQuery({
        queryKey: 'proxies',
        queryFn: () => fetchWithToken('/api/proxies', token).then(e => e.json())
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
                            <Label>Endpoint</Label>
                        </TableColumn>
                        <TableColumn demandPopin minWidth={600} popinText="Dimensions">
                            <Label>Target URL</Label></TableColumn>
                        <TableColumn demandPopin minWidth={600} popinText="Weight">
                            <Label>Status</Label>
                        </TableColumn>
                        <TableColumn>
                            <Label>Last Modified</Label>
                        </TableColumn>
                    </>}
            >
                {query.data.data.map(e =>
                    <TableRow>
                        <TableCell>
                            <Label>
                                {e.name}
                            </Label>
                        </TableCell>
                        <TableCell>
                            <Label>
                                {e.endpoint}
                            </Label>
                        </TableCell>
                        <TableCell>
                            <Label>
                                {e.targetURL}
                            </Label>
                        </TableCell>
                        <TableCell>
                            <Label>
                                {e.status}
                            </Label>
                        </TableCell>
                        <TableCell>
                            <Label>
                                {e.name}
                            </Label>
                        </TableCell>
                    </TableRow>
                )}
            </Table>
        )
    }

}

function ProxyCreate() {

    const navigate = useNavigate()

    const breadcrumbClick = (e: CustomEvent) => {
        if (e.detail.item.id) {
            navigate('/proxies')
        }
    }

    const [readyToSave, setReadyToSave] = useState(false)

    const submitForm = (e) => {
        e.preventDefault()
    }

    const testConnection = (e) => {
        const formData = getFormData()
        console.log(formData)
    }

    const getElement = (id) => document.getElementById(id) as any

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
                    <Input id='name' />
                </FormItem>
                <FormItem label="Endpoint">
                    <Input id='endpoint' />
                </FormItem>
                <FormItem label='Target URL'>
                    <Input id='targetURL' />
                </FormItem>
                <FormItem label="Credential" >
                    <Select id="credential">
                        <Option value="1">
                            BASIC Auth
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
        </div>
    )
}

function ProxyDisplay() {

    const navigate = useNavigate()

    return (
        <DynamicPage
            headerTitle={
                <DynamicPageTitle
                    actions={
                        <>
                            <Button design="Emphasized" onClick={() => navigate('/proxies/create')}>Create</Button>
                        </>}
                    header={<Title>Proxies</Title>} >

                </DynamicPageTitle>}
        >

            <ProxyTable />

        </DynamicPage>
    )
}

interface ProxyProp {
    mode: 'CRE' | 'DIS' | 'UPD'
}

export default function Proxies({ mode = 'DIS' }: ProxyProp) {

    const navigate = useNavigate()

    let content
    switch (mode) {
        case 'CRE':
            return <ProxyCreate />

        default:
            return <ProxyDisplay />
    }
}