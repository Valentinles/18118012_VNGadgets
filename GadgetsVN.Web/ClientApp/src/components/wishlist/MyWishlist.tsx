import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { IMyWishlist } from './IMyWishlist';
import WishlistCard from './WishlistCard'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MyWishlist(props: IMyWishlist) {
    const [open, setOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
        setIsLoggedIn(props.onIsLoggedIn);
    }, [isLoggedIn]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        window.location.reload();
    };

    const renderItems = () => {
        if (isLoggedIn) {
            return <>
                <Box sx={{ flexGrow: 1, pl: 3, pt: 12 }}>
                    <Grid
                        container spacing={{ xs: 1, md: 4, p: 2 }}
                        columns={{ xs: 4, sm: 8, md: 16 }}
                        alignItems="left"
                        justifyContent="left"
                    >
                        {
                            props.wishlistedItems.map((i: any) => {
                                return (
                                    <Grid item xs={2} sm={2} md={4} key={i.item.productId}>
                                        <WishlistCard
                                            key={i.item.productId}
                                            product={i.item.product}
                                            onWishlistCountChange={props.onWishlistCountChange}
                                            onCartCountChange={props.onCartCountChange}
                                            onIsLoggedIn={props.onIsLoggedIn}
                                            onIsAdmin={props.onIsAdmin}
                                            onProductsChange={props.onProductsChange}
                                            onWishlistItemsChange={props.onWishlistCountChange}
                                            onCartItemsChange={props.onCartItemsChange}
                                        />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Box>
            </>
        }
    }

    return (
        <div>
            <FavoriteIcon fontSize='large' onClick={handleClickOpen} />
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <FavoriteIcon fontSize='large' />
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Wishlist
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <br />
                {renderItems()}
            </Dialog>
        </div>
    );
}