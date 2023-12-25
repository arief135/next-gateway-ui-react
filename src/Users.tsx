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
            navigate('/users')
        }
    }

    const { token } = useToken()

    const getElement = (id: string) => document.getElementById(id) as any

    const getFormData = () => {
        const firstName = getElement('firstName').value
        const lastName = getElement('lastName').value
        const username = getElement('username').value as string
        const email = getElement('email').value
        const role = getElement('role').selectedOption.value
        const password = getElement('password').value
        const password2 = getElement('password2').value

        return {
            firstName, lastName, username, email, role, password, password2
        }
    }

    const toast = useRef(null)

    const setToastMessage = (text: string) => {
        if (toast.current) {
            const ctoast = toast.current as any
            ctoast.innerHTML = text
            ctoast.show()
        }
    }

    const userMutation = useMutation({
        mutationFn: (data: any) => {
            return postWithToken('/api/users', token as string, data)
        },
        onError: (e: any) => {
            setToastMessage(e.message)
        }
    })

    const submitForm = (e: any) => {
        e.preventDefault()

        const formData = getFormData()

        //validate
        if (formData.username.length == 0) {
            setToastMessage('Username must not be empty')
            return
        }

        if (formData.password != formData.password2) {
            setToastMessage('Passwords do not match')
            return
        }

        userMutation.mutate({
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            email: formData.email,
            role: formData.role,
            password: formData.password
        })
    }

    if (userMutation.isSuccess) {
        return <Navigate to='/users' />
    }

    return (
        <div style={{ width: '100%', margin: '0 40px' }}>
            <Breadcrumbs onItemClick={breadcrumbClick}>
                <BreadcrumbsItem id="users">
                    Users
                </BreadcrumbsItem>
                <BreadcrumbsItem>
                    Create
                </BreadcrumbsItem>
            </Breadcrumbs>
            <div style={{ marginBottom: '30px' }}></div>

            <Form
                backgroundDesign="Solid"
                onSubmit={submitForm}
                columnsXL={1}
            >
                <FormItem label="First Name">
                    <Input id='firstName' />
                </FormItem>

                <FormItem label="Last Name">
                    <Input id='lastName' />
                </FormItem>

                <FormItem label='Username'>
                    <Input id='username' />
                </FormItem>

                <FormItem label="Email" >
                    <Input id='email' />
                </FormItem>

                <FormItem label="Password" >
                    <Input id='password' type="Password" />
                </FormItem>

                <FormItem label="Confirm Password" >
                    <Input id='password2' type="Password" />
                </FormItem>

                <FormItem label="Role" >
                    <Select id="role">
                        <Option value="ADMINISTRATOR">ADMINISTRATOR</Option>
                        <Option value="DEVELOPER">DEVELOPER</Option>
                        <Option value="SERVICE">SERVICE</Option>
                    </Select>
                </FormItem>

                <FormItem>
                    <Button type="Submit" style={{ width: '120px' }}>Save</Button>
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
                            <Button design="Emphasized" onClick={() => navigate('/users/create')}>Create</Button>
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