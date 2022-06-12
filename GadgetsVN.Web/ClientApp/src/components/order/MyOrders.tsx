import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Container from '@mui/material/Container';
import { IOrder } from './IOrder';
import orderService from '../../services/OrderService';
import OrdersTable from '../order/OrdersTable';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MyOrders() {
    const [open, setOpen] = React.useState(false);
    const [myOrders, setMyOrders] = React.useState<Array<IOrder>>([]);

    React.useEffect(() => {
        getMyOrders();
    }, [myOrders.values]);
    const getMyOrders = async () => {
        const result = await orderService.getMyOrders();
        setMyOrders(result);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const exportUserOrders = async () => {
        const result: any = await orderService.exportUserOrders();
        result.arrayBuffer().then((res: any) => {
            const url = window.URL.createObjectURL(new Blob([res]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'VN_Gadgets_Orders.xlsx');
            document.body.appendChild(link);
            link.click();
        });
    }

    const sortByPriceDesc = () => {
        myOrders.sort((a, b) => (b.quantity - a.quantity))
    }

    return (
        <div>
            <ListItem button onClick={handleClickOpen}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary={'My Orders'} />
            </ListItem>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <ShoppingCartIcon fontSize='large' />
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Orders
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <br />
                <Container maxWidth="xl">
                    <Button onClick={exportUserOrders}>
                        Export
                    </Button>
                    <OrdersTable orders={myOrders} />
                </Container>
            </Dialog>
        </div>
    );
}