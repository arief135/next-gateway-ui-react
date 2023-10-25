import {
  Avatar,
  Badge,
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  DynamicPage,
  DynamicPageHeader,
  DynamicPageTitle,
  FlexBox,
  FlexBoxDirection,
  InputPropTypes,
  Label,
  MessageStrip,
  ObjectStatus,
  Panel,
  ShellBar,
  SideNavigation,
  SideNavigationItem,
  Table,
  TableCell,
  TableColumn,
  TableRow,
  Text,
  Title
} from '@ui5/webcomponents-react';
import { useState } from 'react';

function App() {
  const [inputVal, setInputVal] = useState('');
  const handleInput: InputPropTypes['onInput'] = (e) => {
    setInputVal(e.target.value ?? '');
  };
  return (
    <>
      <ShellBar
        logo={<img src="/vite.svg" alt={'Vite Logo'} />}
        primaryTitle="NEXT Gateway Administration"
        profile={<Avatar initials={'UI5'} />}
      />
      <FlexBox
        style={{height:'100%'}}
        direction={FlexBoxDirection.Row}>

        <SideNavigation style={{height:'100%'}}>

          <SideNavigationItem
            icon="home"
            text="Home"
          />
          <SideNavigationItem
            expanded
            icon="group"
            text="Proxy"
          />

        </SideNavigation>

        <DynamicPage
          headerTitle={<DynamicPageTitle actions={<><Button design="Emphasized">Create</Button></>} header={<Title>Proxies</Title>} ></DynamicPageTitle>}
        >

          <Table
            columns={<><TableColumn style={{ width: '12rem' }}><Label>Product</Label></TableColumn><TableColumn minWidth={800} popinText="Supplier"><Label>Supplier</Label></TableColumn><TableColumn demandPopin minWidth={600} popinText="Dimensions"><Label>Dimensions</Label></TableColumn><TableColumn demandPopin minWidth={600} popinText="Weight"><Label>Weight</Label></TableColumn><TableColumn><Label>Price</Label></TableColumn></>}
            onLoadMore={function Ta() { }}
            onPopinChange={function Ta() { }}
            onRowClick={function Ta() { }}
            onSelectionChange={function Ta() { }}
          >
            <TableRow>
              <TableCell>
                <Label>
                  Notebook Basic
                </Label>
              </TableCell>
              <TableCell>
                <Label>
                  Very Best Screens
                </Label>
              </TableCell>
              <TableCell>
                <Label>
                  30 x 18 x 3cm
                </Label>
              </TableCell>
              <TableCell>
                <Label>
                  4.2KG
                </Label>
              </TableCell>
              <TableCell>
                <Label>
                  956EUR
                </Label>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label>
                  Notebook Basic 17HT-1001
                </Label>
              </TableCell>
              <TableCell>
                <Label>
                  Very Best Screens
                </Label>
              </TableCell>
              <TableCell>
                <Label>
                  29 x 17 x 3.1cm
                </Label>
              </TableCell>
              <TableCell>
                <Label>
                  4.5KG
                </Label>
              </TableCell>
              <TableCell>
                <Label>
                  1249EUR
                </Label>
              </TableCell>
            </TableRow>
          </Table>

        </DynamicPage>

      </FlexBox>
    </>
  );
}

export default App;
