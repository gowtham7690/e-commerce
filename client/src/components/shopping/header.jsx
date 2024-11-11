import { HousePlug, Menu, ShoppingCart, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/auth-slice';
import { useState, useEffect, useRef } from 'react';

function MenuItems() {
    const handleNavigate = (currItem , section) => {
        sessionStorage.clear();
        const curFilter = {
            [currItem] : [section]
        }
        sessionStorage.setItem('filter',JSON.stringify(curFilter));
    }
    return (
        <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
            <Link to="/shop/home" className="hover:text-blue-500">Home</Link>
            <Link onClick = {() => handleNavigate('category' , 'men')} to="/shop/listing" className="hover:text-blue-500">Men</Link>
            <Link onClick = {() => handleNavigate('category' , 'women')}to="/shop/listing" className="hover:text-blue-500">Women</Link>
            <Link onClick = {() => handleNavigate('category' , 'kids')}to="/shop/listing" className="hover:text-blue-500">Kids</Link>
            <Link onClick = {() => handleNavigate('category' , 'accessories')}to="/shop/listing" className="hover:text-blue-500">Accessories</Link>
        </nav>
    );
}

function HeaderRightContent() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogOut = async () => {
        await dispatch(logoutUser());
        navigate('/login');
    };

    const handleCart = () => {
        navigate('/shop/cart');
    };

    const handleToggleDropdown = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative flex lg:items-center lg:flex-row flex-col gap-4">
            <button onClick={handleCart}>
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">cart</span>
            </button>
            <button
                onClick={handleToggleDropdown}
                className="h-8 w-8 text-center text-white font-bold rounded-full bg-black"
            >
                {user?.userName[0].toUpperCase()}
            </button>
            {open && (
                <div
                    ref={dropdownRef}
                    className="absolute top-10 right-0 bg-white shadow-lg rounded-md p-2 flex flex-col items-start"
                >
                    <Link to="/shop/account" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                        Account
                    </Link>
                    <button onClick={handleLogOut} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                    </button>
                </div>
            )}
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
