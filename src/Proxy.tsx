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
                backgroundDesign="Transparent"
                style={{
                    alignItems: 'left'
                }}
                titleText="Create New Proxy"
                columnsXL={1}
            >
                <FormItem label="Name">
                    <Input />
                </FormItem>
                <FormItem label="Endpoint">
                    <Input />
                </FormItem>
                <FormItem label='Target URL'>
                    <Input />
                </FormItem>
                <FormItem label="Credential" >
                    <Select>
                        <Option>
                            BASIC Auth
                        </Option>
                    </Select>
                </FormItem>

                <FormGroup titleText="Credential Details">
                    <FormItem label="User Name">
                        <Input />
                    </FormItem>
                    <FormItem label='Paswords'>
                        <Input />
                    </FormItem>
                </FormGroup>

                <FormItem>
                    <Button>Test Connection</Button>
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