import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Container from '@mui/material/Container';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { IMyCart } from './IMyCart';
import CartCard from './CartCard';
import Grid from '@mui/material/Grid';
import orderService from '../../services/OrderService';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IOrderCreate } from '../order/IOrderCreate';
import cartService from '../../services/CartService';
const steps = ['Products in cart', 'Select Quantity', 'Confirm the order'];

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MyCart(props: IMyCart) {
    const [open, setOpen] = React.useState(false);
    const [ordersQuantity, setOrdersQuantity] = React.useState<Array<IOrderCreate>>([]);

    React.useEffect(() => {
        const mappingArray: IOrderCreate[] = props.cartItems.map(i => ({
            productId: parseInt(i.item.productId),
            quantity: 0
        }));
        setOrdersQuantity(mappingArray);
    }, [props.cartItems]);

    const handleInputChange = (e: any, productId: any) => {
        const { value } = e.target;
        const targetIndex = ordersQuantity.findIndex((i: any) => {
            return i.productId == productId;
        });
        console.log(targetIndex);
        console.log("VALUE  " + value);
        if (targetIndex !== -1) {
            ordersQuantity[targetIndex].quantity = value;
            setOrdersQuantity(ordersQuantity);
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        makeOrder();
        props.cartItems.forEach(async i => {
            const product: any = {
                'productId': `${i.item.product.id}`
            };
            await cartService.removeItem(product);
        })
        window.location.reload();
    };

    const makeOrder = async () => {
        const createOrder = await orderService.createOrder(ordersQuantity);
        console.log(createOrder);
    }

    const renderSteps = () => {
        if (activeStep === 0) {
            return (
                <React.Fragment>
                    <Box sx={{ flexGrow: 1, pl: 3, pt: 12 }}>
                        <Grid
                            container spacing={{ xs: 1, md: 4, p: 2 }}
                            columns={{ xs: 4, sm: 8, md: 16 }}
                            alignItems="left"
                            justifyContent="left"
                        >
                            {
                                props.cartItems.map((i: any) => {
                                    return (
                                        <Grid item xs={2} sm={2} md={4} key={i.item.productId}>
                                            <CartCard
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
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )
        }
        if (activeStep === 1) {
            return (
                <React.Fragment>
                    <Box sx={{ flexGrow: 1, pl: 3, pt: 12 }}>
                        <Grid
                            container spacing={{ xs: 1, md: 4, p: 2 }}
                            columns={{ xs: 4, sm: 8, md: 16 }}
                            alignItems="left"
                            justifyContent="left"
                        >
                            {
                                props.cartItems.map((i: any) => {
                                    return (
                                        <Grid item xs={2} sm={2} md={4} key={i.item.product.id}>
                                            <Card sx={{ maxWidth: 300, height: '100%' }}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="220"
                                                        image={i.item.product.imageUrl}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h6" component="div" color='primary' sx={{
                                                            overflow: "hidden",
                                                            display: "-webkit-box",
                                                            WebkitLineClamp: 1,
                                                            WebkitBoxOrient: "vertical"
                                                        }}>
                                                            {i.item.product.brand} {i.item.product.deviceModel}
                                                        </Typography>
                                                        <Stack direction="row" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                                            <Typography variant="subtitle1" color="text.secondary" >
                                                                {i.item.product.category.title}
                                                            </Typography>
                                                            <Chip label={`${(i.item.product.price).toFixed(2)} €`} color="primary" />
                                                        </Stack>
                                                    </CardContent>
                                                    <CardActions>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id={(i.item.productId).toString()}
                                                                //value={i.quantity}
                                                                label="Quantity"
                                                                defaultValue=''
                                                                onChange={e => {
                                                                    handleInputChange(e, i.item.productId)
                                                                }}
                                                            >
                                                                <MenuItem value={1}>1</MenuItem>
                                                                <MenuItem value={2}>2</MenuItem>
                                                                <MenuItem value={3}>3</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </CardActions>
                                                </CardActionArea>
                                            </Card >
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Box >
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment >
            )
        }
        if (activeStep === 2) {
            return (
                <React.Fragment>
                    <Box sx={{ flexGrow: 1, pl: 3, pt: 12 }}>
                        <Grid container justifyContent="center">
                            <img src='https://cdn.dribbble.com/users/1138069/screenshots/8974973/media/2b32ae97856da7406151c6ae6ea086cc.gif' width="550" />
                        </Grid>
                        <Typography variant="h4" color="primary" textAlign="center">

                            To complete the order, please click the FINISH button.
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Finish</Button>
                    </Box>
                </React.Fragment>
            )
        }
    }
    return (
        <div>
            <ShoppingBagIcon fontSize='large' onClick={handleClickOpen} />
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <ShoppingBagIcon fontSize='large' />
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Shopping Cart
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <br />
                <Container maxWidth="xl">
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps: { completed?: boolean } = {};
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {renderSteps()}
                    </Box>
                </Container>
            </Dialog>
        </div>
    );
}