import { ChevronLeftIcon, ChevronRightIcon, Footprints, CloudLightning, BabyIcon, WatchIcon, ShirtIcon } from "lucide-react";
import banner1 from "../../assets/banner-1.webp";
import banner2 from "../../assets/banner-2.webp";
import banner3 from "../../assets/banner-3.webp";
import banner4 from "../../assets/banner_!.jpg";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ShoppingProduct from "../../components/shopping/product-title";
import { addCart } from "../../store/shop/cart-slice";
import { fetchAllFilteredProduct, getProductDetails } from "../../store/shop/product-slice";
import ProductDetailModal from "../../components/shopping/product-details";
import { useNavigate } from "react-router-dom";

const slides = [banner1, banner2, banner3, banner4]; // Moved outside component

function ShoppingHome() {
    const [currSlide, setCurrSlide] = useState(0);
    const { productList, productDetails } = useSelector((state) => state.shopProducts);
    const { user } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrSlide(prev => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        dispatch(fetchAllFilteredProduct({ filterParams: null, sortParams: null }));
    }, [dispatch]);

    const handleNavigate = useCallback((category, section) => {
        sessionStorage.clear();
        sessionStorage.setItem('filter', JSON.stringify({ [category]: [section] }));
        navigate('/shop/listing');
    }, [navigate]);

    const handleGetProduct = useCallback(async (productId) => {
        await dispatch(getProductDetails(productId));
        setOpen(true);
    }, [dispatch]);

    const handleCartProduct = useCallback(async (productId) => {
        await dispatch(addCart({ userId: user?.id, productId, quantity: 1 }))
            .then((data) => console.log(data));
    }, [dispatch, user?.id]);

    const slideImages = useMemo(() => (
        slides.map((slide, index) => (
            <img
                src={slide}
                alt={`Slide ${index + 1}`}
                key={index}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currSlide ? 'opacity-100' : 'opacity-0'}`}
            />
        ))
    ), [currSlide]);

    return (
        <div className="relative flex flex-col min-h-screen">
            <div className="relative w-full h-[600px]">
                {slideImages}
                <button 
                    onClick={() => setCurrSlide(prev => (prev - 1 + slides.length) % slides.length)} 
                    className="absolute top-1/2 left-4 rounded-sm transform -translate-y-1/2 p-2 bg-white/80"
                >
                    <ChevronLeftIcon className="w-4 h-4" />
                </button>
                <button 
                    onClick={() => setCurrSlide(prev => (prev + 1) % slides.length)} 
                    className="absolute top-1/2 right-4 p-2 rounded-sm transform -translate-y-1/2 bg-white"
                >
                    <ChevronRightIcon className="w-4 h-4" />
                </button>
            </div>

            <div className="flex flex-col pb-4 w-full px-12 bg-blue-100">
                <h2 className="text-3xl font-bold text-center my-8">Shop by Category</h2>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {[
                        { label: 'Men', icon: <ShirtIcon className="w-12 h-12" />, category: 'men' },
                        { label: 'Women', icon: <CloudLightning className="w-12 h-12" />, category: 'women' },
                        { label: 'Accessories', icon: <WatchIcon className="w-12 h-12" />, category: 'accessories' },
                        { label: 'Kids', icon: <BabyIcon className="w-12 h-12" />, category: 'kids' },
                        { label: 'Shoes', icon: <Footprints className="w-12 h-12" />, category: 'footwear' },
                    ].map(({ label, icon, category }) => (
                        <div 
                            key={category} 
                            onClick={() => handleNavigate('category', category)} 
                            className="bg-white flex flex-col h-[150px] justify-center items-center cursor-pointer hover:shadow-xl transition-shadow"
                        >
                            <div>{icon}</div>
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-center mb-8">Featured Products</h1>
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {productList && productList.length > 0 &&
                            productList.map((item) => (
                                <ShoppingProduct 
                                    key={item._id} 
                                    handleGetProduct={handleGetProduct} 
                                    handleCartProduct={handleCartProduct} 
                                    product={item} 
                                />
                            ))
                        }
                    </div>
                </div>
            </section>

            {open && productDetails && (
                <ProductDetailModal 
                    handleCartProduct={handleCartProduct} 
                    open={open} 
                    product={productDetails} 
                    setOpen={setOpen} 
                />
            )}
        </div>
    );
}

export default ShoppingHome;
