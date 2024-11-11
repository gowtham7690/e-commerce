const Cart = require("../../models/cart");
const Product = require("../../models/product");

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || !quantity) {
            
            return res.status(400).json({
                success: false,
                message: "Invalid data provided"
            });
        }
        
        const prod = await Product.findById(productId);
        if (!prod) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }
        
        const findProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        
        if (findProductIndex === -1) {
            cart.items.push({ productId, quantity });
        } else {
            cart.items[findProductIndex].quantity += quantity;
        }

        await cart.save();

        await cart.populate({
            path : 'items.productId',
            select : 'image title price salePrice',
        });
        

        res.status(200).json({
            success: true,
            message: "Product added to cart"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while adding product to cart"
        });
    }
};

const fetchCart = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID provided"
            });
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: "image title price salePrice"
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const validItems = cart.items.filter(item => item.productId);

        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save();
        }

        const populatedCart = validItems.map(item => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populatedCart
            },
            message: "Cart fetched successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while fetching cart"
        });
    }
};

const updateCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided"
            });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const findProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (findProductIndex !== -1) {
            cart.items[findProductIndex].quantity = quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();

        await cart.populate({
            path : 'items.productId',
            select : 'image title price salePrice',
        });

        const populatedCart = cart.items.map(item => ({
            productId: item.productId._id,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : null,
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populatedCart,
            },
            message: "Cart updated successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while updating cart"
        });
    }
};

const deleteFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided"
            });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();

        await cart.populate({
            path : 'items.productId',
            select : 'image title price salePrice',
        });
        const populatedCart = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : null,
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populatedCart,
            },
            message: "Product removed from cart"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while removing product from cart"
        });
    }
};

module.exports = {
    addToCart,
    fetchCart,
    updateCart,
    deleteFromCart
};
