import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Productmage from "../../components/admin/image-upload";
import { addnewProduct ,editProduct, fetchAllProduct } from "../../store/admin/product-slice";
import AdminProduct from "../../components/admin/product-title";

const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
};

export default function Product() {
    const [open, setToggle] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [image, setImage] = useState(null);
    const [imageLoading, setimageLoading] = useState(false);
    const [currentEditid, setcurrentEditId] = useState(null);
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.adminProducts.product);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });
        if (image) {
            data.append("image", image); 
        }
        console.log(formData);
        try {
            if (currentEditid !== null) {
                console.log(currentEditid);
                const result = await dispatch(editProduct({ id: currentEditid, formData: data }))
                if (result.payload?.success === true) {
                    dispatch(fetchAllProduct());
                    setFormData(initialFormData);
                    setcurrentEditId(null);
                    setImage(null);
                    setToggle(false);
                }
            }else {
                const result = await dispatch(addnewProduct(data));
                if (result.payload?.success === true) {
                    dispatch(fetchAllProduct());
                    setFormData(initialFormData);
                    setImage(null);
                    setToggle(false);
                }
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    }
    

    useEffect(() => {
        dispatch(fetchAllProduct());
    }, [dispatch]);

    return (
        <div className="flex flex-col">
            <button onClick={() => {setToggle(!open);
                if(open === true)
                setcurrentEditId(null);
            }} className="bg-black text-white rounded-md p-2">
                {open ? "Cancel" : "Add new Product"}
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {productList && productList.length > 0 ? (
                    productList.map((item) => (
                        <AdminProduct 
                            setFormData={setFormData} 
                            setToggle={setToggle} 
                            setccurid={setcurrentEditId} 
                            key={item._id} 
                            product={item} 
                        /> 
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>

            {open && (
                <form onSubmit={handleSubmit} className="mt-4">
                    <Productmage image={image} setImage={setImage} imageLoading={imageLoading} />

                    <div>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}  // Bind formData value
                            placeholder="Enter product title"
                            onChange={handleChange}
                            className="block border rounded-md p-2 mb-2"
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description} // Bind formData value
                            placeholder="Enter product description"
                            onChange={handleChange}
                            className="block border rounded-md p-2 mb-2"
                        />
                    </div>
                    <div>
                        <label>Category</label>
                        <select 
                            name="category" 
                            value={formData.category}  // Bind formData value
                            onChange={handleChange} 
                            className="block border rounded-md p-2 mb-2">
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="kids">Kids</option>
                            <option value="accessories">Accessories</option>
                            <option value="footwear">Footwear</option>
                        </select>
                    </div>
                    <div>
                        <label>Brand</label>
                        <select 
                            name="brand" 
                            value={formData.brand}  // Bind formData value
                            onChange={handleChange} 
                            className="block border rounded-md p-2 mb-2">
                            <option value="nike">Nike</option>
                            <option value="adidas">Adidas</option>
                            <option value="puma">Puma</option>
                            <option value="levi">Levis</option>
                            <option value="zara">Zara</option>
                            <option value="hm">H&M</option>
                        </select>
                    </div>
                    <div>
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}  // Bind formData value
                            placeholder="Enter product price"
                            onChange={handleChange}
                            className="block border rounded-md p-2 mb-2"
                        />
                    </div>
                    <div>
                        <label>Sale Price</label>
                        <input
                            type="number"
                            name="salePrice"
                            value={formData.salePrice}  // Bind formData value
                            placeholder="Enter sale price (optional)"
                            onChange={handleChange}
                            className="block border rounded-md p-2 mb-2"
                        />
                    </div>
                    <div>
                        <label>Total Stock</label>
                        <input
                            type="number"
                            name="totalStock"
                            value={formData.totalStock}  // Bind formData value
                            placeholder="Enter total stock"
                            onChange={handleChange}
                            className="block border rounded-md p-2 mb-2"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-2">
                        {currentEditid ? "Update Product" : "Add Product"}
                    </button>
                </form>
            )}
        </div>
    );
}

