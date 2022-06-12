import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import productService from '../../services/ProductService';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import { IProductDefaultProps } from './IProductDefaultProps';
import { DialogContentText } from '@mui/material';

export default function DeleteProduct(props: IProductDefaultProps) {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);

    const renderErrorAlert = () => {
        if (error) {
            return <Alert severity="error">Something went wrong.</Alert>
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const deleteProduct = async () => {
        const productId: number = props.product.id;
        const deleteResult = await productService.deleteProduct(productId);
        if (deleteResult !== 200) {
            setError(true);
        } else {
            props.onProductsChange();
            handleClose();
        }
    }
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
                <DeleteIcon fontSize='medium' />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ textAlign: "center" }} color='primary'>
                    Delete {props.product.brand} {props.product.deviceModel}
                </DialogTitle>
                <DialogContentText style={{ textAlign: "center" }}>
                    {renderErrorAlert()}
                    <DeleteIcon fontSize='large' color='primary' />
                </DialogContentText>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={deleteProduct}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}