import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, deleteCart, updateCart } from '../../store/shop/cart-slice';
import CartProductItems from '../../components/shopping/product-items';
import { useNavigate } from 'react-router-dom';

function ShoppingCart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth); 
    const { cartItems } = useSelector((state) => state.shopcarts);

    useEffect(() => {
        if (user) {
            dispatch(fetchCart(user.id));
        }
    }, [dispatch, user]);

    const items = cartItems?.items || [];
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    async function handleDelete(currentProduct) {
        if (!user) return;
        await dispatch(deleteCart({ productId: currentProduct, userId: user.id }));
        dispatch(fetchCart(user.id));
    }

    async function handleUpdate(currentProduct, option) {
        if (!user) return;
        let quantity = currentProduct?.quantity;

        if (option === '+') {
            quantity += 1;
        } else if (quantity > 1) {
            quantity -= 1;
        } else {
            return;
        }

        await dispatch(updateCart({ productId: currentProduct?.productId, userId: user.id, quantity }));
        dispatch(fetchCart(user.id));
    }

    return (
        <div className="p-6 w-full flex flex-col md:flex-row">
            <div className="flex-grow">
                <h1 className="text-2xl font-bold mb-6 min-w-full w-full">Your Cart</h1>
                <p className="text-gray-600 mb-4">There are {items.length} products in your cart</p>
                
                {items.length > 0 ? (
                    <>
                        <div className="grid grid-cols-7 gap-4 bg-gray-100 p-4 rounded-t-md font-bold text-gray-700">
                            <span className = "grid col-span-3">Product</span>
                            <span className="text-center ">Unit Price</span>
                            <span className="text-center">Quantity</span>
                            <span className="text-center">Subtotal</span>
                            <span className="text-center">Remove</span>
                        </div>
                        
                        <div>
                            {items.map((item) => (
                                <CartProductItems 
                                    handleUpdate={handleUpdate} 
                                    handleDelete={handleDelete} 
                                    key={item.productId} 
                                    product={item} 
                                />
                            ))}
                        </div>

                        <div className="mt-4">
                            <button className="text-gray-500 hover:text-red-500" onClick={() => console.log('Clear cart logic here')}>
                                <i className="fas fa-trash-alt"></i> Clear Cart
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500">Your cart is empty.</p>
                )}
            </div>

            {items.length > 0 && (
                <div className="w-full md:w-1/3 mt-8 md:mt-0 md:ml-8 bg-gray-100 p-6 rounded-md">
                    <div className="text-lg font-bold mb-4">Summary</div>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span>Estimate for</span>
                        <span>United Kingdom</span>
                    </div>
                    <div className="border-t border-gray-300 pt-4 flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <button 
                        className="bg-green-500 text-white w-full py-2 rounded mt-4 hover:bg-green-600"
                        onClick={() => navigate('/shop/checkout')}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
}

export default ShoppingCart;
