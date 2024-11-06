const express = require('express')

const { addToCart,
    fetchCart,
    updateCart,
    deleteFromCart} = require('../../controller/shop/cart-controller')

const router = express.Router();

router.post('/add',addToCart);
router.get('/get/:userId',fetchCart);
router.put('/update',updateCart);
router.delete('/delete/:userId/:productId',deleteFromCart);

module.exports = router;