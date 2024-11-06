const cart = require("../../models/cart")
const product = require("../../models/product")
const addToCart = async(req , res) => {
    try{
        const {userId , productId , quantity} = req.body;
        if(!userId || !productId || !quantity)
        {
            res.status(404).json({
                success : false ,
                message : "invaild data provided"
            })
        }
        const prod = await product.findById(productId);
        if(!product){
            res.status(404).json({
                success : false ,
                message : "product not found"
            })}
        let carts = await cart.findOne({userId});
        if(!carts){
            carts = new cart({userI , items : []})
        }
        const findProductIndex = carts.items.findIndex(item => items.productId.toString() === prodcuctId);
        if(findProductIndex === -1)
            cart.items.pus({productId , quantity})
        else 
            cart.items[findProductIndex].quantity += quantity

        await cart.save();
        res.status(200).json({
            success : true ,
            message : "product saved"
        })

    }
    catch (error){
        console.log(error);
        res.status(404).json({
            success : false ,
            message : "error occured"
        })
    }
}
const fetchCart = async(req , res) => {
    try{
        const {userId} = req.params;
        if(!userId)
            {
                res.status(404).json({
                    success : false ,
                    message : "invaild userdata provided"
                })
            }
        const carts = await cart.findOne({userId}).populate({
            path : 'item.productId',
            select : "image title price salePrice"
        })

        if(!carts){
            res.status(404).json({
                success : false ,
                message : "cart not found"
            })
        }
        const validItems = carts.items.filter(item => item.productId);

        if(validItems.length < carts.items.length){
            carts.items = validItems
            await carts.save()
        }
        const populateCart = validItems.map(item => ({
            productId : item.productId._id,
            image :  item.product._id.image,
            title :  item.product._id.title,
            price :  item.product._id.price,
            salePrice :  item.product._id.salePrice,
            quantity :  item.quantity,
        }))
        res.status(200).json({
            success : true ,
            data : {
                ...cart._doc,
                items : populateCart
            },
            message : "product fetched"
        })
    }
    catch (error){
        console.log(error);
        res.status(404).json({
            success : true ,
            message : "error occured"
        })
    }
}
const updateCart = async(req , res) => {
    try{ 
        const {userId , productId , quantity} = req.body;
        if(!userId || !productId || !quantity)
        {
            res.status(404).json({
                success : false ,
                message : "invaild data provided"
            })
        }
        const carts = await cart.findOne({userId})
        if(!carts){
            res.status(404).json({
                success : false ,
                message : "cart not found"
            })
        }

        const populateCart = validItems.map(item => ({
            productId : item.productId._id : null,
            image :  item.product._id.image : null,
            title :  item.product._id.title : null,
            price :  item.product._id.price : null,
            salePrice :  item.product._id.salePrice : null,
            quantity :  item.quantity,
        }))

        res.status(200).json({
            success : true,
            data : {
                ...cart._doc,
                items : populateCart,
            },

        })
    }
    catch (error){
        console.log(error);
        res.status(404).json({
            success : true ,
            message : "error occured"
        })
    }
}
const deleteCart = async(req , res) => {
    try{
        const {userId , productId} = req.params;
        if(!userId || !productId )
            {
                res.status(404).json({
                    success : false ,
                    message : "invaild data provided"
                })
            }
            const carts = await cart.findOne({userId}).populate({
                path : 'item.productId',
                select : "image title price salePrice"
            })
    }
    catch (error){
        console.log(error);
        res.status(404).json({
            success : true ,
            message : "error occured"
        })
    }
}

module.export = {
    addtoCart , 
    updateCart ,
    deleteCart , 
    fetchCart
}