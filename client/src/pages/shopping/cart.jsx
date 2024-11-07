import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart , deleteCart , updateCart } from '../../store/shop/cart-slice';
import CartProductItems from '../../components/shopping/product-items';

function ShoppingCart() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth); 
    const { cartItems } = useSelector((state) => state.shopcarts);
    useEffect(() => {
        if (user) {
            dispatch(fetchCart(user.id));
        }
    }, [dispatch, user]);
    const items = cartItems?.items || [];
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    async function handleDelete(currentProduct){
        console.log(currentProduct);
        await dispatch(deleteCart({productId :currentProduct , userId : user.id})).then((data) => console.log(data));
        // dispatch(fetchCart(user.id));   
    } 
    async function handleUpdate(currentProduct, option) {
        let quantity = currentProduct?.quantity;
        if (option === '+') {quantity += 1;
        
        await dispatch(updateCart({ productId: currentProduct?.productId, userId: user.id, quantity }));
        // dispatch(fetchCart(user.id)); 
        }
        else if (quantity > 1){ quantity -= 1
            await dispatch(updateCart({ productId: currentProduct?.productId, userId: user.id, quantity }));
            // dispatch(fetchCart(user.id));
             } 
        }
    return (
        <div className="p-6 w-full">
            <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
            {items.length > 0 ? (
            <>
                <div>
                   { items.map((item) => (
                        <CartProductItems handleUpdate = {handleUpdate} handleDelete = {handleDelete} key={item.productId} product={item} />
                    ))}
                    </div>

                <div className="mt-8 border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <button className="bg-blue-500 text-white w-full py-2 rounded mt-4 hover:bg-blue-600" onClick={() => alert('Proceed to Checkout')}>
                        Checkout
                    </button>
                </div>
            </>
                ) : (
                    <p className="text-gray-500">Your cart is empty.</p>
            )}
        </div>
    );
}

export default ShoppingCart;
