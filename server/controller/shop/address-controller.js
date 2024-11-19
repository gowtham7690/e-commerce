const address = require('../../models/address')

const addAddress = async(req , res) => {
    try{
        const {userId , Address , city , pincode , phone , state} = req.body;
        console.log(req.body);
        if(!userId || !Address || !city || !pincode || !phone || !state) 
        {
            return res.status(400).json({
                success : false ,
                message : "invaild input"
               }) 
            }
            const newAddress = new address({
            userId , Address , city , pincode , phone , state
        })
        await newAddress.save();

        return res.status(200).json({
            success : true ,
            newAddress,
            message : "address added"
           }) 

    }
    catch(e){
       console.log(e);
       res.status(500).json({
        success : false ,
        message : "error occured"
       }) 
    }
}
const fetchAddress = async(req , res) => {
    try{
        const {userId} = req.params;

        if(!userId){
            return res.status(500).json({
                success : false ,
                message : "userid required "
               }) 
        }

        const Address = await address.find({userId})
        // console.log(userId);
        return res.status(200).json({
            success : true ,
            data : Address,
            message : "address fethced"
           }) 
    }
    catch(e){
       console.log(e);
       res.status(500).json({
        success : false ,
        message : "error occured"
       }) 
    }
}
const updateAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const {formData} = req.body;
        console.log(formData)
        const { Address, city, pincode, phone, state } = formData ;
        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "Invalid input"
            });
        }
        const updatedAddress = await address.findOneAndUpdate(
            { _id: addressId, userId },
            { Address, city, pincode, phone, state },
            { new: true } 
        );
        if (!updatedAddress) {
            return res.status(404).json({
                success: false,
                message: "Address or user not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: updatedAddress,
            message: "Address updated"
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "An error occurred"
        });
    }
}


const deleteAddress = async(req , res) => {
    try{
        const {userId , addressId} = req.params;
        if(!userId || !addressId)
        {
            return res.status(500).json({
                success : false ,
                message : "invalid input"
               }) 
        }
        const Address = await address.findOneAndDelete({
            _id : addressId,userId} )
        
        if(!Address)
            {
                return res.status(500).json({
                    success : false ,
                    message : "Address or user not found"
                    }) 
            }

            return res.status(201).json({
                success : true ,
                data : Address,
                message : "address deleted"
                }) 

    }
    catch(e){
       console.log(e);
       res.status(500).json({
        success : false ,
        message : 'error occured'
       }) 
    }
}


module.exports = {addAddress , fetchAddress , updateAddress , deleteAddress};