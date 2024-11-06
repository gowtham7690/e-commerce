import { useDispatch} from "react-redux";
import { deleteProduct ,fetchAllProduct } from "../../store/admin/product-slice";

function AdminProduct({ product, setccurid, setFormData, setToggle}) {
    const dispatch = useDispatch();
    const handleEdit = () => {
        setToggle(true);             
        setccurid(product._id);       
        setFormData(product);         
    };
    const deleteEdit = async() => {
        const result = await dispatch(deleteProduct(product._id));
        if (result.payload?.success === true) {
            dispatch(fetchAllProduct());
        }
    }
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img 
                src={product?.image}
                alt={product?.title}
                className="w-full h-[300px] object-cover"
            />
            <div className="p-4">
                <h1 className="text-xl font-bold mb-2">{product?.title}</h1>
                <p className="text-gray-600 mb-4">{product?.description}</p>

                <div className="flex justify-between items-center">
                    <span className={`text-lg font-semibold ${product?.salePrice ? "line-through text-red-500" : "text-black"}`}>
                        ${product?.price}
                    </span>
                    {product?.salePrice && (
                        <span className="text-lg font-bold text-green-500">
                            ${product?.salePrice}
                        </span>
                    )}
                </div>

                <div className="mt-4 flex justify-between gap-6">
                    <button onClick={handleEdit} className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
                        Edit
                    </button>
                    <button onClick={deleteEdit}className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminProduct;
