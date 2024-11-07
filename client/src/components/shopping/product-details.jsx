import { StarIcon } from "lucide-react";

function ProductDetailModal({ handleCartProduct , open, product, setOpen }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg overflow-hidden w-full max-w-lg p-6 relative">
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black">
                    &times;
                </button>
                
                <img
                    src={product.image || 'https://via.placeholder.com/400'}
                    alt={product.title}
                    className="w-full h-64 object-cover mb-4 rounded-md"
                />

                <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="font-medium bg-gray-100 px-3 py-1 rounded-md">
                        Brand: {product.brand}
                    </span>
                    <span className="font-medium bg-gray-100 px-3 py-1 rounded-md">
                        Category: {product.category}
                    </span>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 fill-current text-yellow-500" />
                    ))}
                </div>

                <div className="flex justify-between items-center mb-4">
                    <span className={`text-lg font-semibold ${product.salePrice ? "line-through text-red-500" : "text-black"}`}>
                        ${product.price}
                    </span>
                    {product.salePrice && (
                        <span className="text-lg font-bold text-green-500">
                            ${product.salePrice}
                        </span>
                    )}
                </div>

                <p className="text-sm text-gray-500 mb-4">Stock Available: {product.totalStock}</p>

                <button onClick = {() => handleCartProduct(product._id)}
                    className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductDetailModal;
