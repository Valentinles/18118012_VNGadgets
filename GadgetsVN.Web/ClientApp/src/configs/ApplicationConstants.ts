export const ApplicationName = 'GadgetsVN';
export const AdminRole = 'Admin';

export const Urls = {
  Default: 'https://localhost:44303',
  Message: 'message'
};

export const Identity = {
  Login: '/identity/login',
  Register: '/identity/register'
};

export const Product = {
  GetAll: '/product/allproducts',
  Create: '/product/create',
  Delete: '/product/delete/',
  Update: '/product/update/',
  Search: '/product/search/?searchTerm=',
  Filter: '/product/filter/?'
};

export const Category = {
  GetAll: '/category/allcategories',
};

export const Cart = {
  MyCart: '/cart/mycart',
  CartCount: '/cart/mycartcount',
  AddItem: '/cart/additem',
  RemoveItem: '/cart/removeitem',
  IsItemInCart: '/cart/isitemincart/'
};

export const Wishlist = {
  MyWishlist: '/wishlist/mywishlist',
  WishlistCount: '/wishlist/mywishlistcount',
  AddItem: '/wishlist/additem',
  RemoveItem: '/wishlist/removeitem',
  IsWishlisted: '/wishlist/iswishlisted/'
};

export const Order = {
  MyOrders: '/order/myorders',
  AllOrders: '/order/allorders',
  CreateOrder: '/order/create',
  ExportUserOrders: '/order/myordersexport',
  ExportAllOrders: '/order/allordersexport'
};