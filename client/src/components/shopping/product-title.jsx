import { ShoppingCart } from 'lucide-react';

function ShoppingProduct({ product , handleGetProduct}) {
    return (
        <div  className="bg-white shadow-lg rounded-lg overflow-hidden grid grid-rows-[1fr_auto]">
            <img onClick = {() => handleGetProduct(product._id)}
                src={product?.image} 
                alt={product?.title} 
                className="w-full h-[300px] object-cover"
            />
            
            <div onClick = {() => handleGetProduct(product._id)}className="p-4">
                <h1 className="text-xl font-bold mb-2">{product?.title}</h1>
                
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-4">
                    <span className="font-medium bg-gray-100 px-3 py-1 rounded-md text-center">
                        {product?.brand}
                    </span>
                    <span className="font-medium bg-gray-100 px-3 py-1 rounded-md text-center">
                        {product?.category}
                    </span>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <span className={`text-lg font-semibold ${product?.salePrice ? "line-through text-red-500" : "text-black"}`}>
                        ${product?.price}
                    </span>
                    {product?.salePrice && (
                        <span className="text-lg font-bold text-green-500">
                            ${product?.salePrice}
                        </span>
                    )}
                </div>

            </div>
                <button 
                    className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                </button>
        </div>
    );
}

export default ShoppingProduct;
