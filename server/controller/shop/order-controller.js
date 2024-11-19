const paypal = require('../../helpers/paypal');
const Order = require('../../models/order');
const cart = require('../../models/cart');

const createOrder = async (req, res) => {
    try {
        const { orderData } = req.body;
        // console.log(orderData);
        const {
            userId,
            cartId,
            cartItems,
            addressInfo,
            orderStatus ,
            paymentMethod,
            paymentStatus ,
            totalAmount,
            orderDate = new Date(),
            orderUpdateDate = new Date()
        } = orderData;      

        if (!userId || !cartItems || cartItems.length === 0 || !totalAmount) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields (userId, cartItems, or totalAmount).'
            });
        }

        const createPaymentJson = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: 'http://localhost:5173/shop/paypal-return',
                cancel_url: 'http://localhost:5173/shop/paypal-cancel'
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map((item) => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: 'USD',
                            quantity: item.quantity
                        }))
                    },
                    amount: {
                        currency: 'USD',
                        total: totalAmount.toFixed(2)
                    },
                    description: 'Order description'
                }
            ]
        };

        paypal.payment.create(createPaymentJson, async (error, paymentInfo) => {
            if (error) {
                console.error('PayPal Error:', error.response || error);
                return res.status(500).json({
                    success: false,
                    message: 'Error occurred while creating PayPal payment.',
                    error: error.response || error
                });
            } else {
                const newOrder = new Order({
                    userId,
                    cartId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpdateDate,
                    paymentId: null, 
                    payerId: null
                });
                await newOrder.save();

                const approvalUrl = paymentInfo.links.find((link) => link.rel === 'approval_url');
                if (!approvalUrl) {
                    return res.status(500).json({
                        success: false,
                        message: 'Unable to find approval URL from PayPal response.'
                    });
                }
                return res.status(201).json({
                    success: true,
                    approvalUrl: approvalUrl.href,
                    orderId: newOrder._id
                });
            }
        });
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing the order.',
            error
        });
    }
};

const captureOrder = async (req, res) => {
    try {
        const { paymentId, payerId, orderId } = req.body;

        if (!paymentId || !payerId || !orderId) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields (paymentId, payerId, or orderId).'
            });
        }

        const order = await Order.findById(orderId); 
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found.',
            });
        }

        const getCartId = order.cartId;
        if (!getCartId) {
            return res.status(400).json({
                success: false,
                message: 'Cart ID not associated with the order.',
            });
        }

        await Order.findByIdAndUpdate(orderId, {
            paymentStatus: 'paid',
            orderStatus: 'confirmed',
            paymentId,
            payerId,
            orderUpdateDate: new Date(),
        });

        const deletedCart = await cart.findByIdAndDelete(getCartId); // Ensure you await this
        if (!deletedCart) {
            return res.status(400).json({
                success: false,
                message: 'Cart not found or already deleted.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Payment captured successfully, and cart deleted.',
        });
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while capturing the order.',
            error,
        });
    }
};

const getAllOrderByUser = async (req, res) => {
    try {
        const {userId} = req.params;

        const order = await Order.find(userId);

        if(!order.length)
            return res.status(400).json({
                success: false,
                message: 'no orders available'
            });
            
            return res.status(200).json({
                success: true,
                message: 'order fetched',
                data : order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while capturing the order.',
            error,
        });
    }
};
const getAllOrderDetails = async (req, res) => {
    try {const {Id} = req.params;

    const order = await Order.findById(Id);

    if(!order)
        return res.status(400).json({
            success: false,
            message: 'no orders available'
        });
        
        return res.status(200).json({
            success: true,
            message: 'order fetched',
            data : order
    });
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while capturing the order.',
            error,
        });
    }
};


module.exports = { createOrder, captureOrder , getAllOrderDetails , getAllOrderByUser};
