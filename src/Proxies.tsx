import {
    DynamicPage,
    DynamicPageTitle,
    Button,
    Title,
    Label,
    Table,
    TableCell,
    TableColumn,
    TableRow
} from "@ui5/webcomponents-react";
import { useQuery } from "react-query";
import { useToken } from "./Auth";
import { fetchWithToken } from "./Util";

function ProxyTable() {

    const { token } = useToken()

    const query = useQuery({
        queryKey: 'proxies',
        queryFn: () => fetchWithToken('/api/proxies', token).then(e => e.json())
    })

    if (query.isSuccess) {
        console.log(query.data.data)
    }

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

export default function Proxies() {

    return (
        <DynamicPage
            headerTitle={<DynamicPageTitle actions={<><Button design="Emphasized">Create</Button></>} header={<Title>Proxies</Title>} ></DynamicPageTitle>}
        >

            <ProxyTable />

        </DynamicPage>
    )
}