import { fetchCart } from '../../store/shop/cart-slice';
import CheckoutProductItems from '../../components/shopping/checkout-item';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { getAddress, addAddress } from '../../store/shop/address-slice';
import { createNewOrder } from '../../store/shop/order-slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ShoppingCheckouut() {
    const selectAddressRef = useRef();
    const [isPayment , setIsPayment] = useState(false);
    // const [approvalUrl , setApproval] = useState(null);
    
    function Address({setSelectAddress}) {
        const dispatch = useDispatch();
        const { user } = useSelector((data) => data.auth);
        const [addresses, setAddresses] = useState([]);
        const [open, setOpen] = useState(false);
        const [formData, setFormData] = useState({
            addressId: null,
            Address: '',
            city: '',
            state: '',
            pincode: '',
            phone: ''
        });

        useEffect(() => {
            fetchAddresses();
        }, []);

        const fetchAddresses = async () => {
            const result = await dispatch(getAddress(user.id));
            setAddresses(result.payload?.data || []);
        };

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        };
        const handleSubmit = async (e) => {
            setOpen(false);
            e.preventDefault();
                await dispatch(addAddress({ userId: user.id, Address: formData.Address, city: formData.city, state: formData.state, pincode: formData.pincode, phone: formData.phone }));
            fetchAddresses();
            clearForm();
        };
        
        const clearForm = () => {
            setOpen(!open);
            setFormData({
                addressId: null,
                Address: '',
                city: '',
                state: '',
                pincode: '',
                phone: ''
            });
        };
        return ( 
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-4">Address</h2>
                <div className="w-full max-w-md mb-6 ml-4">
                    {addresses.map((address) => (
                        <div key={address._id} onClick = {() => (selectAddressRef.current = address)} className="bg-gray-100 shadow-md rounded-lg p-4 mb-4">
                            <p><strong>Address:</strong> {address.Address}</p>
                            <p><strong>City:</strong> {address.city}</p>
                            <p><strong>State:</strong> {address.state}</p>
                            <p><strong>Pincode:</strong> {address.pincode}</p>
                            <p><strong>Phone:</strong> {address.phone}</p>
                            <div className = "flex justify-between">
                                
                            </div>
                        </div>
                    ))}
                    <button onClick = {clearForm} className = "p-2 rounded-lg bg-black text-white">{open ? "Cancel" : "Add Address" }</button>
                </div>
                { open  && <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                    <label htmlFor="Address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                    <input
                        type="text"
                        name="Address"
                        id="Address"
                        value={formData.Address}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
                        placeholder="Enter your address"
                        required
                    />

                    <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">City</label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
                        placeholder="Enter your city"
                        required
                    />

                    <label htmlFor="pincode" className="block text-gray-700 text-sm font-bold mb-2">Pincode</label>
                    <input
                        type="text"
                        name="pincode"
                        id="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
                        placeholder="Enter your pincode"
                        required
                    />

                    <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">State</label>
                    <input
                        type="text"
                        name="state"
                        id="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
                        placeholder="Enter your state"
                        required
                    />

                    <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
                        placeholder="Enter your phone number"
                        required
                    />

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Add Address
                    </button>
                </form>}
            </div>
        );
    }

    function ShoppingCart() {
        const dispatch = useDispatch();
        const { user } = useSelector((state) => state.auth); 
        const { cartItems } = useSelector((state) => state.shopcarts);
        // const notify = () => toast("Wow so easy!");

        const items = cartItems?.items || [];
        const totalAmount = items.reduce((sum, item) => sum + (item.salePrice * item.quantity), 0) + 0.00;
        async function handlePayment() {
            if (items.length === 0) {
                toast.error("Your cart is empty. Please add items to proceed.", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                });
                return;
            }
            if (!selectAddressRef.current?.addressId) {
                toast.warning("Please select an address before proceeding.", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                });
                return;
            }
            else{
            const orderData = {
                userId: user?.id,
                cartId: cartItems?._id,
                cartItems: cartItems.items.map((item) => ({
                    productId: item?.productId,
                    tittle: item?.tittle,
                    image: item?.image,
                    price: item?.salePrice,
                    quantity: item?.quantity,
                })),
                addressInfo: {
                    addressId: selectAddressRef.current.addressId,
                    Address: selectAddressRef.current.Address,
                    city: selectAddressRef.current.city,
                    pincode: selectAddressRef.current.pincode,
                    phone: selectAddressRef.current.phone,
                    state: selectAddressRef.current.state,
                },
                orderStatus: 'pending',
                paymentMethod: 'paypal',
                paymentStatus: 'pending',
                totalAmount: totalAmount,
                orderDate: new Date(),
                orderUpdateDate: new Date(),
                paymentId: 'PAYID-MOCK123456789',
                payerId: 'PAYERID12345',
            };
    
            console.log(orderData);
    
            const result = await dispatch(createNewOrder(orderData));
            console.log(result);
    
            if (result?.payload?.success) {
                const approvalUrl = result.payload.approvalUrl;
    
                if (approvalUrl) {
                    console.log(approvalUrl, "Redirecting to PayPal");
                    window.location.href = approvalUrl; 
                } else {
                    console.error("Approval URL not found!");
                }
            } else {
                console.error("Order creation failed!", result?.payload?.message);
            }}
            
        }
        
        useEffect(() => {
            if (user) {
                dispatch(fetchCart(user.id));
            }
        }, [dispatch, user]);


        return (
            <div className="p-6 w-full flex flex-col md:flex-row">
                <div className="flex-grow">
                    <h1 className="text-2xl font-bold mb-6 min-w-full w-full">Your Cart</h1>
                    <p className="text-gray-600 mb-4">There are {items.length} products in your cart</p>
                    
                    {items.length > 0 ? (
                        <>
                            <div className="grid grid-cols-5 gap-4 bg-gray-100 p-4 rounded-t-md font-bold text-gray-700">
                                <span className = "grid col-span-3">Product</span>
                                <span className="text-center ">Sub Total</span>
                                <span className="text-center">Quantity</span>
                            
                            </div>
                            
                            <div>
                                {items.map((item) => (
                                    <CheckoutProductItems  
                                        key={item.productId} 
                                        product={item} 
                                    />

                                ))}
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
                            onClick={() => {
                                
                                handlePayment(user , cartItems)
                                
                            }}
                        >
                            Proceed to PayPal
                        </button>
                    </div>
                )}
            </div>
        );
    }
    return ( <div className = "flex">
       <div className = "flex flex-col">
            <div className  ="flex items-center justify-between">
            
                <p>gpay</p>
                <p>amazonpay</p>
                <p>paypal</p>
            </div>
            <Address  setSelectAddress={(address) => (selectAddressRef.current = address)} />
       </div> 
        <ShoppingCart/>
        <ToastContainer position="down-right" autoClose={3000} hideProgressBar={true} closeOnClick/>
        
    </div>);
}

export default ShoppingCheckouut;