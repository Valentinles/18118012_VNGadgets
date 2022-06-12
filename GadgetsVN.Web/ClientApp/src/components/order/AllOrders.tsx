import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import ListItemIcon from '@mui/material/ListItemIcon';
import Container from '@mui/material/Container';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { IOrder } from './IOrder';
import orderService from '../../services/OrderService';
import OrdersTable from '../order/OrdersTable';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AllOrders() {
    const [open, setOpen] = React.useState(false);
    const [allOrders, setAllOrders] = React.useState<Array<IOrder>>([]);

    React.useEffect(() => {
        getAllOrders();
    }, []);

    const getAllOrders = async () => {
        const result = await orderService.getAllOrders();
        setAllOrders(result);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const exportAllOrders = async () => {
        const result: any = await orderService.exportAllOrders();
        result.arrayBuffer().then((res: any) => {
            const url = window.URL.createObjectURL(new Blob([res]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'VN_Gadgets_Orders.xlsx');
            document.body.appendChild(link);
            link.click();
        });
    }

    return (
        <div>
            <ListItem button onClick={handleClickOpen}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={'Dashboard'} />
            </ListItem>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <DashboardIcon fontSize='large' />
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Admin Dashboard
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <br />
                <Container maxWidth="xl">
                    <Button onClick={exportAllOrders}>
                        Export
                    </Button>
                    <OrdersTable orders={allOrders} />
                </Container>
            </Dialog>
        </div>
    );
}