const product = require('../../models/product');

const getFilterProducts = async (req, res) => {
    try {
        const { category = [], brand = [], sortBy = "Price: Low to High" } = req.query;

        const filter = {};
        if (category.length) {
            filter.category = { $in: category.split(',') };
        }
        if (brand.length) {
            filter.brand = { $in: brand.split(',') };
        }

        const sort = {};
        switch (sortBy) {
            case 'Price: Low to High':
                sort.price = 1;
                break;
            case 'Price: High to Low':
                sort.price = -1;
                break;
            case 'Title: A-Z':  
                sort.title = 1;
                break;
            case 'Title: Z-A':
                sort.title = -1;
                break;
            default:
                sort.price = 1;
        }

        const products = await product.find(filter).sort(sort);
        res.status(200).json({ success: true, products });
    } catch (e) {
        res.status(500).json({ success: false, message: "Error occurred!" });
    }
};
const getProductDetails = async(req, res) => {
    try{
        const {id} = req.params;
        const products = await product.findById(id);

        if(!product)
        {
            return res.status(404).json({
                success : false,
                message : "Product is not found"
            })
        }
        res.status(200).json({
            success : true ,
            data : products
        })
    }catch (e) {
    res.status(500).json({ success: false, message: "Error occurred!" });
}
}

module.exports = { getFilterProducts , getProductDetails};
