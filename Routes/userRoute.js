const express= require('express');
const { home } = require('../Controller/user/homeController');
const { contact } = require('../Controller/user/contactController');
const { service } = require('../Controller/user/serviceController');
const { product, addToCart } = require('../Controller/user/productController');
const { cart } = require('../Controller/user/cartController');
const router = express.Router();

router.get('/',home)
router.get('/contact',contact)
router.get('/service',service)
router.get('/product',product)
router.get('/cart',cart)
router.patch('/add_to_cart',addToCart)

module.exports=router