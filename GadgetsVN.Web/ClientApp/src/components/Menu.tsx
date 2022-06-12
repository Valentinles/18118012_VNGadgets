import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import CreateProduct from './product/CreateProduct';
import AllOrders from './order/AllOrders'
import MyOrders from './order/MyOrders'
import { IMenu } from './IMenu';
type Anchor = 'left'

export default function Menu(props: IMenu) {
    const [state, setState] = React.useState({
        left: false,
    });
    const renderAdminMenu = () => {
        if (props.isAdmin) {
            return (<>
                <Divider />
                <List>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="caption" component="div">
                        Products
                    </Typography>
                    <AllOrders />
                    <CreateProduct onProductsChange={props.onProductsChange} />
                </List>
            </>)
        }
    }

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
        //onClick={toggleDrawer(anchor, false)}
        //onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <Typography sx={{ ml: 2, flex: 1 }} variant="caption" component="div">
                    Orders
                </Typography>
                <MyOrders />
            </List>
            {renderAdminMenu()}
        </Box>
    );

    return (
        <div>
            <React.Fragment >
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon onClick={toggleDrawer('left', true)} />
                </IconButton>
                <Drawer
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                >
                    {list('left')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}