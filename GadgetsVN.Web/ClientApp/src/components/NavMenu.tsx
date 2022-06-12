import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MoreIcon from '@mui/icons-material/MoreVert';
import Login from '../components/identity/Login';
import Register from '../components/identity/Register';
import identityService from '../services/IdentityService';
import { AdminRole } from '../configs/ApplicationConstants';
import AdminMenu from './Menu';
import wishlistService from '../services/WishlistService';
import cartService from '../services/CartService';
import ProductListing from '../components/product/ProductListing';
import MyCart from '../components/cart/MyCart';
import MyWishlist from '../components/wishlist/MyWishlist';
import { IProduct } from './product/IProduct';
import productService from '../services/ProductService';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import categoryService from '../services/CategoryService';
import { ICategory } from './product/ICategory';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function NavMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const [wishlistCount, setWishlistCount] = React.useState(0);
  const [cartCount, setCartCount] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [products, setProducts] = React.useState<Array<IProduct>>([]);
  const [wishlistedItems, setWishlistedItems] = React.useState<Array<IProduct>>([]);
  const [cartItems, setCartItems] = React.useState<Array<IProduct>>([]);
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState<Array<ICategory>>([]);
  //filters
  const [brandF, setBrandF] = React.useState('');
  const [categoryF, setCategoryF] = React.useState('');
  const [priceFromF, setPriceFromF] = React.useState(100);
  const [priceToF, setPriceToF] = React.useState(100);
  const [sortPrice, setSortPrice] = React.useState('');

  React.useEffect(() => {
    setAuthorization();
    if (isLoggedIn) {
      getCartCount();
      getWishlistCount();
    }
    if (searchTerm === '') {
      getProducts();
    }
    getWishlistItems();
    getCartItems();
    onProductsChange();
    onWishlistItemsChange();
    onCartItemsChange();
    getCategories();
  }, [isLoggedIn, isAdmin, products.values]);

  function valuetextFrom(value: number) {
    return `${value}`;
  }
  function valuetextTo(value: number) {
    return `${value}`;
  }
  const handleChangePriceFrom = (event: any, newValue: any) => {
    setPriceFromF(newValue);
  };

  const handleChangePriceTo = (event: any, newValue: any) => {
    setPriceToF(newValue);
  };

  const getCategories = async () => {
    const categoriesResult = await categoryService.getCategories();
    setCategories(categoriesResult);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const onFilter = () => {
    filterItems();
    handleClose();
    setBrandF('');
    setCategoryF('');
    setPriceFromF(0);
    setPriceToF(0);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const getProducts = async () => {
    const productsResult = await productService.getProdcuts();
    setProducts(productsResult);
  }
  const searchProducts = async () => {
    if (searchTerm !== '' && searchTerm.length >= 2) {
      const searchResults = await productService.getSearchedProducts(searchTerm);
      setProducts(searchResults);
    }
  }

  const filterItems = async () => {
    const filterResults = await productService.getFilteredProducts(brandF, categoryF, priceFromF, priceToF, sortPrice);
    setProducts(filterResults);
  }

  const clearSearch = async () => {
    const productsResult = await productService.getProdcuts();
    setProducts(productsResult);
    setSearchTerm('');
  }
  const onProductsChange = () => {
    getProducts();
  }
  const getCartCount = async () => {
    const cartCountResult = await cartService.getCartItemsCount();
    setCartCount(cartCountResult.count)
  }
  const getWishlistCount = async () => {
    const wishlistCountResult = await wishlistService.getWishlistItemsCount();
    setWishlistCount(wishlistCountResult.count);
  }

  const getWishlistItems = async () => {
    const result = await wishlistService.getMyWishlistItems();
    setWishlistedItems(result.items);
  }

  const onWishlistItemsChange = () => {
    getWishlistItems();
  }
  const onCartItemsChange = () => {
    getCartItems();
  }
  const getCartItems = async () => {
    const result = await cartService.getMyCartItems();
    setCartItems(result.items);
  }

  const onSearch = (): string => {
    return searchTerm;
  }
  const login = (): void => {
    setIsLoggedIn(true);
  }
  const setAuthorization = (): void => {
    if (identityService.getStoredToken() !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    if (identityService.getUserAdminRole() === AdminRole) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }
  const onWishlistCountChange = (): void => {
    getWishlistCount();
  }

  const onCartCountChange = (): void => {
    getCartCount();
  }

  const onIsLoggedIn = (): boolean => {
    return isLoggedIn;
  }

  const onIsAdmin = (): boolean => {
    return isAdmin;
  }
  const renderLoginMenu = () => {
    if (isLoggedIn) {
      return (
        <>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={wishlistCount} color="error">
                <MyWishlist
                  onWishlistCountChange={onWishlistCountChange}
                  onCartCountChange={onCartCountChange}
                  onIsLoggedIn={onIsLoggedIn}
                  onIsAdmin={onIsAdmin}
                  onProductsChange={onProductsChange}
                  wishlistedItems={wishlistedItems}
                  onCartItemsChange={onCartItemsChange}
                />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={cartCount} color="error">
                <MyCart
                  onWishlistCountChange={onWishlistCountChange}
                  onCartCountChange={onCartCountChange}
                  onIsLoggedIn={onIsLoggedIn}
                  onIsAdmin={onIsAdmin}
                  onProductsChange={onProductsChange}
                  onCartItemsChange={onCartItemsChange}
                  cartItems={cartItems}
                />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle fontSize='large' />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </>
      );
    } else {
      return (<>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Login onLogin={login} />
          <Register />
        </Box>
      </>)
    }
  }
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={() => {
        identityService.removeToken();
        identityService.removeUserAdminRole();
        handleMenuClose()
        window.location.reload();
      }}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <AdminMenu
              onProductsChange={onProductsChange}
              isAdmin={isAdmin}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              VN Gadgets
            </Typography>

            <Search>
              <StyledInputBase
                value={searchTerm}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={e => {
                  setSearchTerm(e.target.value)
                }}
              />
              <IconButton onClick={searchProducts}>
                <SearchIcon style={{ color: 'white' }} />
              </IconButton>
              <IconButton onClick={clearSearch}>
                <ClearIcon style={{ color: 'white' }} />
              </IconButton>
              <IconButton onClick={handleClickOpen}>
                <FilterListIcon style={{ color: 'white' }} />
              </IconButton>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ textAlign: "center" }} color='primary'>
                  Filter Products
                </DialogTitle>
                <DialogContentText style={{ textAlign: "center" }}>
                  <FilterListIcon fontSize='large' color='primary' />
                </DialogContentText>
                <DialogContent>
                  <TextField
                    label="Brand"
                    variant="outlined"
                    autoFocus
                    margin="dense"
                    id="brand"
                    type="text"
                    fullWidth
                    onChange={e => {
                      setBrandF(e.target.value)
                    }}
                  />
                  <FormLabel>Category</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={e => {
                      setCategoryF(e.target.value)
                    }}
                  >
                    {
                      categories.map(c => {
                        return (
                          <FormControlLabel key={c.id} value={c.title} control={<Radio />} label={c.title} />
                        )
                      })
                    }
                  </RadioGroup>
                  <FormLabel id="demo-row-radio-buttons-group-label">Price From</FormLabel>
                  <Box sx={{ width: 500 }}>
                    <Slider
                      aria-label="Temperature"
                      defaultValue={100}
                      getAriaValueText={valuetextFrom}
                      valueLabelDisplay="auto"
                      step={1000}
                      marks
                      min={100}
                      max={10000}
                      value={priceFromF}
                      onChange={handleChangePriceFrom}
                    />
                  </Box>
                  <FormLabel id="demo-row-radio-buttons-group-label">Price To</FormLabel>
                  <Box sx={{ width: 500 }}>
                    <Slider
                      aria-label="Temperature"
                      defaultValue={10000}
                      getAriaValueText={valuetextTo}
                      valueLabelDisplay="auto"
                      step={1000}
                      marks
                      min={100}
                      max={10000}
                      value={priceToF}
                      onChange={handleChangePriceTo}
                    />
                  </Box>
                  <FormLabel>Sort</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={e => {
                      setSortPrice(e.target.value)
                    }}
                  >
                    <FormControlLabel value="desc" control={<Radio />} label="Price Descending" />
                    <FormControlLabel value="asc" control={<Radio />} label="Price Ascending" />
                  </RadioGroup>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={onFilter}>Filter</Button>
                </DialogActions>
              </Dialog>
            </Search>
            {renderLoginMenu()}
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>
      <ProductListing
        onWishlistCountChange={onWishlistCountChange}
        onCartCountChange={onCartCountChange}
        onIsLoggedIn={onIsLoggedIn}
        onIsAdmin={onIsAdmin}
        onSearch={onSearch}
        onProductsChange={onProductsChange}
        onWishlistItemsChange={onWishlistItemsChange}
        onCartItemsChange={onCartItemsChange}
        products={products}
      />
    </>
  );
}