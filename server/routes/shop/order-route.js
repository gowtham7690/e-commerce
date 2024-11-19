const express = require('express');
const  {captureOrder , createOrder , getAllOrderDetails , getAllOrderByUser} = require('../../controller/shop/order-controller')
const router = express.Router();

router.post('/create' , createOrder);
router.post('/capture' , captureOrder);
router.post('/list/:userId' , getAllOrderDetails );
router.post('/details/:id' , getAllOrderByUser);

module.exports = router;