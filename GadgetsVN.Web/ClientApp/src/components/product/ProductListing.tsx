import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { IProduct } from "./IProduct";
import ProductCard from './ProductCard';
import { IProductListingProps } from './IProductListingProps';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ProductListing(props: IProductListingProps) {
    return (
        <Box sx={{ flexGrow: 1, pl: 3, pt: 12 }}>
            <Grid
                container spacing={{ xs: 1, md: 4, p: 2 }}
                columns={{ xs: 4, sm: 8, md: 16 }}
                alignItems="left"
                justifyContent="left"
            >
                {
                    props.products.map((pr: IProduct) => {
                        return (
                            <Grid item xs={2} sm={2} md={4} key={pr.id}>
                                <ProductCard
                                    product={pr}
                                    onWishlistCountChange={props.onWishlistCountChange}
                                    onCartCountChange={props.onCartCountChange}
                                    onIsLoggedIn={props.onIsLoggedIn}
                                    onIsAdmin={props.onIsAdmin}
                                    onProductsChange={props.onProductsChange}
                                    onWishlistItemsChange={props.onWishlistItemsChange}
                                    onCartItemsChange={props.onCartItemsChange}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box>
    );
}