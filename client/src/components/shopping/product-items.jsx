import {ChevronLeft , ChevronRight} from 'lucide-react';
function CartProductItems({ product, handleDelete, handleUpdate }) {
    return (
        <div className="grid grid-cols-7 gap-4 mb-4">
            <img src={product?.image} alt={product?.title} className="grid pl-2 w-20 h-20 object-cover rounded" />
            <div className="grid col-span-2 mx-10">
                <h3 className="text-md font-semibold">{product?.title}</h3>
                <p className="text-sm text-gray-500">${product?.price}</p>
            </div>
            <div className = "flex items-center justify-center">${product?.salePrice}</div>
            <div className = "grid">
                <div className="flex items-center  m-3 mt-4 mb-2 border border-black rounded-lg ">
                    <span className = "px-3">{product?.quantity}</span>
                   <div className = "flex flex-col  px-3 items-center">
                        <button onClick={() => handleUpdate(product, '+')} className="rotate-90  text-lg font-bold">
                            <ChevronLeft />
                        </button>
                        <button onClick={() => handleUpdate(product, '-')} className="rotate-90 text-lg font-bold">
                            <ChevronRight />
                        </button>
                    </div>
                </div>
            </div>
            <div className = "flex items-center justify-center">${product?.salePrice * product?.quantity}</div>
            <button onClick={() => handleDelete(product?.productId)} className="p-2 text-gray-500 hover:text-red-500">
                🗑️
            </button>
        </div>
    );
}

export default CartProductItems;
