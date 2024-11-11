import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProduct, getProductDetails } from "../../store/shop/product-slice";
import { addCart } from "../../store/shop/cart-slice";
import { useSearchParams } from 'react-router-dom';
import ProductFilter from "../../components/shopping/filter";
import ShoppingProduct from "../../components/shopping/product-title";
import ProductDetailModal from "../../components/shopping/product-details";
import { ArrowUpDownIcon } from "lucide-react";

function ShoppingListing() {
    const dispatch = useDispatch(); 
    const { productList, productDetails } = useSelector(state => state.shopProducts);
    const user = useSelector(state => state.auth);
    const [sortMenuOpen, setSortMenuOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState(null);
    const [filter, setFilter] = useState({});
    const [search, setSearchParams] = useSearchParams();

    useEffect(() => {
        // Load initial filter from sessionStorage if available
        const storedFilter = JSON.parse(sessionStorage.getItem('filter'));
        if (storedFilter) {
            setFilter(storedFilter);
        }
    }, []);

    useEffect(() => {
        // Fetch filtered products based on the filter and sort parameters
        dispatch(fetchAllFilteredProduct({ filterParams: filter, sortParams: sort }));
    }, [dispatch, sort, filter]);

    function createSearchParams(filterParams) {
        const queryParams = [];
        for (const [key, value] of Object.entries(filterParams)) {
            if (Array.isArray(value) && value.length > 0) {
                const params = value.join(',');
                queryParams.push(`${key}=${encodeURIComponent(params)}`);
            }
        }
        return queryParams.join('&');
    }    

    useEffect(() => {
        if (filter && Object.keys(filter).length > 0) {
            const queryString = createSearchParams(filter);
            setSearchParams(new URLSearchParams(queryString));
        }
    }, [filter, setSearchParams]);

    const handleSort = (option) => {
        setSort(option);
        setSortMenuOpen(false);
    };

    const handleFilter = (sectionId, option) => {
        let updatedFilter = { ...filter };
        const selectedOptions = updatedFilter[sectionId] || [];
        if (selectedOptions.includes(option)) {
            updatedFilter[sectionId] = selectedOptions.filter(item => item !== option);
        } else {
            updatedFilter[sectionId] = [...selectedOptions, option];
        }
        setFilter(updatedFilter);
        sessionStorage.setItem('filter', JSON.stringify(updatedFilter));
    };

    async function handleGetProduct(getCurProdcut) {
        await dispatch(getProductDetails(getCurProdcut));
        setOpen(true);
    }

    function handleCartProduct(currentProductId) {
        dispatch(addCart({ userId: user.user.id, productId: currentProductId, quantity: 1 }))
            .then((data) => console.log(data));
    }

    return (
        <div className="relative grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
            <ProductFilter filter={filter} handleFilter={handleFilter} />
            <div className="bg-background w-full rounded-lg shadow-sm">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-extrabold">All Products</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{productList.length} Products</span>
                    </div>
                    <div className="relative">
                        <button 
                            className="flex items-center gap-1" 
                            onClick={() => setSortMenuOpen(!sortMenuOpen)}
                        >
                            <span>Sort by</span>
                            <ArrowUpDownIcon className="h-5 w-5" />
                        </button>
                        {sortMenuOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                <ul className="py-1 text-gray-700">
                                    {["Price: Low to High", "Price: High to Low", "Title: A-Z", "Title: Z-A"].map((option) => (
                                        <li 
                                            key={option}
                                            onClick={() => handleSort(option)} 
                                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2 ${
                                                sort === option ? "font-bold text-blue-600" : ""
                                            }`}
                                        >
                                            {sort === option && <span className="text-xs font-bold">•</span>}
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {productList && productList.length > 0 ? 
                        productList.map(items => <ShoppingProduct key={items._id} handleCartProduct={handleCartProduct} handleGetProduct={handleGetProduct} product={items} />) 
                        : null 
                    }
                </div>
            </div>
            {
                open && productDetails ?  <ProductDetailModal handleCartProduct={handleCartProduct} open={open} product={productDetails} setOpen={setOpen} /> : null
            }
        </div>
    );
}

export default ShoppingListing;
