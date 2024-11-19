
function CheckoutProductItems({ product }) {
    return (
        <div className="grid grid-cols-5 gap-4 mb-4">
            <img src={product?.image} alt={product?.title} className="grid pl-2 w-20 h-20 object-cover rounded" />
            <div className="grid col-span-2 mx-10">
                <h3 className="text-md font-semibold">{product?.title}</h3>
            </div>
            <div className = "flex items-center justify-center">${product?.salePrice * product?.quantity}</div>
            <div className="flex items-center  m-3 mt-4 mb-2 border border-black rounded-lg ">
                <span className = "px-3">{product?.quantity}</span>
            </div>
        </div>
    );
}

export default CheckoutProductItems;
