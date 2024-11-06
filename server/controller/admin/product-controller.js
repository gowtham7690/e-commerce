const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/product");

// Image upload handler
const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const file = `data:${req.file.mimetype};base64,${b64}`;
        const result = await imageUploadUtil(file);

        res.json({
            success: true,
            result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while uploading image",
        });
    }
};

const addProduct = async (req, res) => {
    try {
        console.log("Request body:", req.body); 
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
        
        if (!title || !price) {
            return res.status(400).json({
                success: false,
                message: "Title and Price are required",
            });
        }
        
        const newProduct = new Product({title, description, category, brand, price, salePrice, totalStock });
        console.log("New Product:", newProduct); 
        
        await newProduct.save();
        
        res.status(201).json({
            success: true,
            message: "Product successfully added",
            product: newProduct,
        });
    } catch (e) {
        console.error("Error in addProduct:", e); // Detailed error logging
        res.status(500).json({
            success: false,
            message: "Error occurred while adding product",
        });
    }
};


// Fetch all products
const fetchAllProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        
        res.status(200).json({
            success: true,
            message: "Products successfully listed",
            products,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Error occurred while fetching products",
        });
    }
};

// Edit an existing product
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
        const product = await Product.findById(id);
        console.log(req.body , " " , req.params);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Update fields only if new data is provided
        product.title = title || product.title;
        product.description = description || product.description;
        product.category = category || product.category;
        product.brand = brand || product.brand;
        product.salePrice = salePrice || product.salePrice;
        product.price = price || product.price;
        product.totalStock = totalStock || product.totalStock;
        product.image = image || product.image;

        console.log("update" , product);
        await product.save();

        res.status(200).json({
            success: true,
            data: product,
            message: "Product successfully updated",
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Error occurred while updating product",
        });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product successfully deleted",
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Error occurred while deleting product",
        });
    }
};

module.exports = { handleImageUpload, addProduct, fetchAllProduct, deleteProduct, editProduct };
