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
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import productService from '../../services/ProductService';
import categoryService from '../../services/CategoryService';
import Alert from '@mui/material/Alert';
import { ICategory } from '../product/ICategory';
import { IProductCreate } from '../product/IProductCreate';
import EditIcon from '@mui/icons-material/Edit';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { IProductDefaultProps } from './IProductDefaultProps';
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateProduct(props: IProductDefaultProps) {
    const [open, setOpen] = React.useState(false);
    const [brand, setBrand] = React.useState('');
    const [deviceModel, setDeviceModel] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [category, setCategory] = React.useState('');
    const [warranty, setWarranty] = React.useState(1);
    const [quantity, setQuantity] = React.useState(1);
    const [error, setError] = React.useState(false);
    const [categories, setCategories] = React.useState<Array<ICategory>>([]);

    React.useEffect(() => {
        setBrand(props.product.brand);
        setDeviceModel(props.product.deviceModel);
        setDescription(props.product.description);
        setImage(props.product.imageUrl);
        setPrice(props.product.price);
        setCategory(props.product.category.id);
        setWarranty(props.product.warranty);
        setQuantity(props.product.quantity);
        getCategories();
    }, []);

    const getCategories = async () => {
        const categoriesResult = await categoryService.getCategories();
        setCategories(categoriesResult);
    }
    const renderErrorAlert = () => {
        if (error) {
            return <Alert severity="error">Oops, something went wrong.</Alert>
        }
    }
    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
        setError(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateProduct = async () => {
        const product: any = {
            'id': props.product.id,
            'brand': brand,
            'deviceModel': deviceModel,
            'description': description,
            'imageUrl': image,
            'price': price,
            'categoryId': category,
            'warranty': warranty,
            'quantity': quantity,
        };
        const productResult = await productService.updateProduct(product);
        if (productResult !== 200) {
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
                <EditIcon fontSize='medium' />
            </IconButton>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <ValidatorForm
                    onSubmit={updateProduct}
                    onError={errors => console.log(errors)}
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
                                Update Product
                            </Typography>
                            <Button autoFocus color="inherit" type="submit">
                                Update
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
                            <EditIcon fontSize='large' color='primary' />
                        </Typography>
                        <Typography align='center' variant="h6">
                            <img src={props.product.imageUrl} width='150px' />
                        </Typography>
                        <br />
                        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            justifyContent="center"
                            alignItems="center">
                            <Grid item xs={6}>
                                {renderErrorAlert()}
                                <br />
                            </Grid>
                        </Grid>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            justifyContent="center"
                            alignItems="center">
                            <Grid item xs={6}>
                                <TextValidator
                                    required
                                    autoFocus
                                    margin="dense"
                                    id="brand"
                                    label="Brand"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e: any) => {
                                        setBrand(e.target.value)
                                        setError(false)
                                    }}
                                    name="brand"
                                    value={brand}
                                    validators={['required']}
                                    errorMessages={['Brand is required', 'Brand is not valid']}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextValidator
                                    required
                                    autoFocus
                                    margin="dense"
                                    id="deviceModel"
                                    label="Model"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e: any) => {
                                        setDeviceModel(e.target.value)
                                        setError(false)
                                    }}
                                    name="deviceModel"
                                    value={deviceModel}
                                    validators={['required']}
                                    errorMessages={['Model is required', 'Model is not valid']}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl required fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={category}
                                        label="Category"
                                        onChange={handleChange}
                                    >
                                        {
                                            categories.map(({ id, title }) => {
                                                return (
                                                    <MenuItem key={id} value={id}>{title}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextValidator
                                    required
                                    autoFocus
                                    margin="dense"
                                    id="image"
                                    label="Image URL"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e: any) => {
                                        setImage(e.target.value)
                                        setError(false)
                                    }}
                                    name="imageUrl"
                                    value={image}
                                    validators={['required']}
                                    errorMessages={['Image URL is required', 'Image URL is not valid']}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextValidator
                                    required
                                    multiline
                                    maxRows={5}
                                    minRows={3}
                                    id="description"
                                    label="Description"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e: any) => {
                                        setDescription(e.target.value)
                                        setError(false)
                                    }}
                                    name="description"
                                    value={description}
                                    validators={['required']}
                                    errorMessages={['Description is required', 'Description is not valid']}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextValidator
                                    required
                                    autoFocus
                                    margin="dense"
                                    id="warranty"
                                    label="Warranty"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e: any) => {
                                        setWarranty(parseInt(e.target.value))
                                        setError(false)
                                    }}
                                    name="warranty"
                                    value={warranty}
                                    validators={['required', 'minNumber:0', 'maxNumber:255']}
                                    errorMessages={['Warranty is required', 'Warranty is not valid']}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextValidator
                                    required
                                    autoFocus
                                    margin="dense"
                                    id="price"
                                    label="Price"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e: any) => {
                                        setPrice(parseInt(e.target.value))
                                        setError(false)
                                    }}
                                    name="price"
                                    value={price}
                                    validators={['required', 'minNumber:1', 'maxNumber:100000']}
                                    errorMessages={['Price is required', 'Price is not valid']}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextValidator
                                    required
                                    autoFocus
                                    margin="dense"
                                    id="image"
                                    label="Quantity"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e: any) => {
                                        setQuantity(parseInt(e.target.value))
                                        setError(false)
                                    }}
                                    name="quantity"
                                    value={quantity}
                                    validators={['required', 'minNumber:1', 'maxNumber:200']}
                                    errorMessages={['Quantity is required', 'Quantity is not valid']}
                                />
                            </Grid>
                        </Grid>
                    </Container>
                </ValidatorForm>
            </Dialog>
        </div>
    );
}