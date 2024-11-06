import { HousePlug, Menu, ShoppingCart, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/auth-slice';
import { useState } from 'react';

function CartModal({ onClose }) {
    return (
        <div className="fixed inset-0 flex justify-end z-50">
   
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50" onClick={onClose}></div>
            <div className="relative w-[500px] h-full bg-white p-5 shadow-lg">
            <div className = "flex justify-between">
                <h2 className="text-lg font-bold">Your Cart</h2>
                <button  onClick={onClose}>
                   <span className = " font-bold text-xl">&times;</span>
                </button>
            </div>
                <p>Total: $1000</p>
                <button className="bg-blue-500 text-white p-2 rounded mt-4 w-full" onClick={() => alert('Proceed to Checkout')}>
                    Checkout
                </button>
            </div>
        </div>
    );
}

function MenuItems() {
    return (
        <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
            <Link to="/shop/home" className="hover:text-blue-500">Home</Link>
            <Link to="/shop/listing" className="hover:text-blue-500">Men</Link>
            <Link to="/shop/listing" className="hover:text-blue-500">Women</Link>
            <Link to="/shop/listing" className="hover:text-blue-500">Kids</Link>
            <Link to="/shop/listing" className="hover:text-blue-500">Accessories</Link>
        </nav>
    );
}

function HeaderRightContent() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [open, setToggle] = useState(false); 
    const navigate = useNavigate();

    const handleLogOut = async () => {
        const result = await dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <div className="flex lg:items-center lg:flex-row flex-col gap-4">
            <button onClick={() => setToggle(true)}>
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">cart</span>
            </button>
            <Link to="/shop/account">
                <span>account</span>
            </Link>
            <button onClick={handleLogOut}>
                <LogOut className="mr-2 h-4 w-4" />
            </button>
            <button className="h-8 w-8 text-center text-white font-bold rounded-full bg-black">
                {user?.userName[0].toUpperCase()}
            </button>
            {open && <CartModal onClose={() => setToggle(false)} />}
        </div>
    );
}

function ShoppingHeader() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    return (
        <>
            <header className="sticky top-0 z-40 w-full border-b bg-background">
                <div className="flex h-16 items-center justify-between px-4 md:px-6">
                    <Link to="/shop/home" className="flex items-center gap-2">
                        <HousePlug className="h-6 w-6" />
                        <span>Ecommerce</span>
                    </Link>
                    <div className="lg:hidden">
                        <Menu className="h-6 w-6" />
                    </div>
                    <div className="hidden lg:block">
                        <MenuItems />
                    </div>
                    <div className="hidden lg:block">
                        <HeaderRightContent />
                    </div>
                </div>
            </header>
        </>
    );
}

export default ShoppingHeader;
