const express= require('express');
const { home } = require('../Controller/user/homeController');
const { contact, contactForm } = require('../Controller/user/contactController');
const { service } = require('../Controller/user/serviceController');
const { product, addToCart } = require('../Controller/user/productController');
const { cartPage,deleteItem } = require('../Controller/user/cartController');
const router = express.Router();

router.get('/',home)
router.route('/contact').get(contact).post(contactForm)
router.get('/service',service)
router.get('/product',product)
router.route('/cart').get(cartPage).patch(deleteItem)
router.patch('/add_to_cart',addToCart)


module.exports=router