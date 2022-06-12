import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Chip, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ProductDetails from '../product/ProductDetails';
import cartService from '../../services/CartService';
import { IProductCardProps } from '../product/IProductCardProps';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

export default function CartCard(props: IProductCardProps) {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [isItemInCart, setIsItemIncart] = React.useState(false);

    React.useEffect(() => {
        setIsLoggedIn(props.onIsLoggedIn());
        setIsAdmin(props.onIsAdmin());
        if (isLoggedIn) {
            isItemCart();
        }
    }, [isLoggedIn, isAdmin, isItemInCart]);

    const isItemCart = async () => {
        const product: number = props.product.id
        const productResult = await cartService.IsItemInCart(product);
        if (productResult === 200) {
            setIsItemIncart(true);
        }
        if (productResult === 404) {
            setIsItemIncart(false);
        }
    }

    const removeItemFromCart = async () => {
        const product: any = {
            'productId': `${props.product.id}`
        };
        console.log(product);
        const productResult = await cartService.removeItem(product);
        if (productResult !== 200) {
            console.log('ne stana');
        } else {
            setIsItemIncart(false);
            props.onCartCountChange();
            props.onCartItemsChange();
            props.onProductsChange();
        }
    }

    const renderCartIcon = () => {
        if (isItemInCart) {
            return (
                <>
                    <IconButton size="large" aria-label="show 4 new mails" color="primary" onClick={removeItemFromCart}>
                        <RemoveShoppingCartIcon fontSize='medium' />
                    </IconButton>
                </>
            )
        }
    }
    const renderProductFunctionality = () => {
        if (isLoggedIn) {
            return (
                <>
                    {renderCartIcon()}
                </>
            )
        }
    }

    const renderCartItems = () => {
        if (isItemInCart) {
            return (
                <Card sx={{ maxWidth: 300, height: '100%' }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="220"
                            image={props.product.imageUrl}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div" color='primary' sx={{
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: "vertical"
                            }}>
                                {props.product.brand} {props.product.deviceModel}
                            </Typography>
                            <Stack direction="row" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle1" color="text.secondary" >
                                    {props.product.category.title}
                                </Typography>
                                <Chip label={`${(props.product.price).toFixed(2)} €`} color="primary" />
                            </Stack>
                        </CardContent>
                        <CardActions>
                            {renderProductFunctionality()}
                            <ProductDetails
                                product={props.product}
                                onProductsChange={props.onProductsChange} />

                        </CardActions>
                    </CardActionArea>
                </Card >
            )
        }
    }

    return (
        <>
            {renderCartItems()}
        </>

    );
}