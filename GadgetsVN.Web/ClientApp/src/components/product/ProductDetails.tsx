import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Container from '@mui/material/Container';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { IProductDefaultProps } from './IProductDefaultProps';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductDetails(props: IProductDefaultProps) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="primary"
                onClick={handleClickOpen}
            >
                <AssignmentIcon fontSize='medium' />
            </IconButton>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Product Details
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <br />
                <Container maxWidth="xl">
                    <Typography align='center' variant="h4" color='primary'>
                        {props.product.brand} {props.product.deviceModel}
                    </Typography>
                    <br />
                    <Typography align='center' variant="h5">
                        <AssignmentIcon fontSize='large' color='primary' />
                    </Typography>
                    <Typography align='center' variant="h6">
                        <img src={props.product.imageUrl} width='300px' />
                    </Typography>
                    <Typography align='center' variant="subtitle1">
                        {props.product.description}
                    </Typography>
                    <br />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Details</TableCell>
                                    <TableCell align="center">Category</TableCell>
                                    <TableCell align="center">Warranty</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="center">Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <TableCell component="th" scope="row">
                                        Value
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant='subtitle1' color='primary'>
                                            {props.product.category.title}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant='subtitle1' color='primary'>
                                            {props.product.warranty} years
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant='subtitle1' color='primary'>
                                            {props.product.quantity} pcs
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant='subtitle1' color='primary'>
                                            {(props.product.price).toFixed(2)} €
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Dialog>
        </div>
    );
}