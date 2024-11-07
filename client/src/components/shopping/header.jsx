import { HousePlug, Menu, ShoppingCart, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/auth-slice';

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
    const navigate = useNavigate();
    const handleLogOut = async () => {
        await dispatch(logoutUser());
        navigate('/login');
    };
    async function handleCart(){
        navigate('/shop/cart');
    }
    return (
        <div className="flex lg:items-center lg:flex-row flex-col gap-4">
            <button onClick={handleCart}>
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
