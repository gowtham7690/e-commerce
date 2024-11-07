function CartProductItems({ product , handleDelete , handleUpdate}) {
    return (
        <div className="flex items-center h-[100px] w-full justify-between mb-4">
            <img src={product?.image} alt={product?.title} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1 mx-10">
                <h3 className="text-md font-semibold">{product?.title}</h3>
                <p className="text-sm text-gray-500">${product?.price}</p>
            </div>
            <div className="flex items-center space-x-2">
                <button onClick ={() => handleUpdate(product , '-') } className="p-1 text-lg font-bold">-</button>
                <span>{product?.quantity}</span>
                <button onClick ={() => handleUpdate(product , '+') } className="p-1 text-lg font-bold">+</button>
            </div>
            <button onClick = {() => handleDelete(product?.productId)} className="p-2 text-gray-500 hover:text-red-500">
                🗑️
            </button>
        </div>
    );
}

export default CartProductItems;