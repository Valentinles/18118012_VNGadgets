import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Chip, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DeleteProduct from './DeleteProduct';
import UpdateProduct from './UpdateProduct';
import ProductDetails from './ProductDetails';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import wishlistService from '../../services/WishlistService';
import cartService from '../../services/CartService';
import { IProductCardProps } from './IProductCardProps';

export default function ProductCard(props: IProductCardProps) {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [isWishlisted, setIsWishlisted] = React.useState(false);
    const [isItemInCart, setIsItemIncart] = React.useState(false);

    React.useEffect(() => {
        setIsLoggedIn(props.onIsLoggedIn());
        setIsAdmin(props.onIsAdmin());
        if (isLoggedIn) {
            isItemWishlisted();
            isItemCart();
        }
    }, [isLoggedIn, isAdmin]);

    const isItemWishlisted = async () => {
        const product: number = props.product.id
        const productResult = await wishlistService.isWishlisted(product);
        if (productResult === 200) {
            setIsWishlisted(true);
        }
        if (productResult === 404) {
            setIsWishlisted(false);
        }
    }

    const addItemToWishlist = async () => {
        const product: any = {
            'productId': `${props.product.id}`
        };
        console.log(product);
        const productResult = await wishlistService.addItem(product);
        if (productResult !== 200) {
            console.log('ne stana');
        } else {
            setIsWishlisted(true);
            props.onWishlistCountChange();
            props.onWishlistItemsChange();
        }
    }

    const removeItemFromWishlist = async () => {
        const product: any = {
            'productId': `${props.product.id}`
        };
        console.log(product);
        const productResult = await wishlistService.removeItem(product);
        if (productResult !== 200) {
            console.log('ne stana');
        } else {
            setIsWishlisted(false);
            props.onWishlistCountChange();
            props.onWishlistItemsChange();
        }
    }

    const renderWishlistIcon = () => {
        if (isWishlisted) {
            return (
                <>
                    <IconButton size="large" aria-label="show 4 new mails" color="primary" onClick={removeItemFromWishlist}>
                        <FavoriteIcon fontSize='medium' />
                    </IconButton>
                </>
            )
        } else {
            return (
                <>
                    <IconButton size="large" aria-label="show 4 new mails" color="primary" onClick={addItemToWishlist}>
                        <FavoriteBorderOutlinedIcon fontSize='medium' />
                    </IconButton>
                </>
            )
        }
    }

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

    const addItemInCart = async () => {
        const product: any = {
            'productId': `${props.product.id}`
        };
        console.log(product);
        const productResult = await cartService.addItem(product);
        if (productResult !== 200) {
            console.log('ne stana');
        } else {
            setIsItemIncart(true);
            props.onCartCountChange();
            props.onCartItemsChange();
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
        }
    }

    const renderCartIcon = () => {
        if (isItemInCart) {
            return (
                <>
                    <IconButton size="large" aria-label="show 4 new mails" color="primary" onClick={removeItemFromCart}>
                        <ShoppingBagIcon fontSize='medium' />
                    </IconButton>
                </>
            )
        } else {
            return (
                <>
                    <IconButton size="large" aria-label="show 4 new mails" color="primary" onClick={addItemInCart}>
                        <ShoppingBagOutlinedIcon fontSize='medium' />
                    </IconButton>
                </>
            )
        }
    }
    const renderProductFunctionality = () => {
        if (isLoggedIn) {
            return (
                <>
                    {isAdmin &&
                        <>
                            <UpdateProduct
                                product={props.product}
                                onProductsChange={props.onProductsChange} />
                            <DeleteProduct
                                product={props.product}
                                onProductsChange={props.onProductsChange}
                            />
                        </>
                    }
                    {renderWishlistIcon()}
                    {renderCartIcon()}
                </>
            )
        }
    }

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
                    <ProductDetails
                        product={props.product}
                        onProductsChange={props.onProductsChange} />
                    {renderProductFunctionality()}
                </CardActions>
            </CardActionArea>
        </Card >
    );
}