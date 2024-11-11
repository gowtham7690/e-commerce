function ProductFilter({ filter, handleFilter }) {
   
    return (
        <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Filter</h2>

                <h3 className="text-md font-semibold mt-4">Brand</h3>
                <div className="flex flex-col gap-2">
                    {["nike", "adidas", "puma", "levi", "zara", "hm"].map((brand) => (
                        <label key={brand} className="flex font-medium items-center gap-2">
                            <input
                                type="checkbox"
                                onChange={() => handleFilter("brand", brand)}
                                checked={filter.brand ? filter.brand.includes(brand) : false}
                                value={brand}
                                className="mr-2"
                            /> 
                            
                            {brand.charAt(0).toUpperCase() + brand.slice(1)}
                        </label>
                    ))}
                </div>

                <h3 className="text-md font-semibold mt-4">Category</h3>
                <div className="flex flex-col gap-2">
                    {["men", "women", "kids", "accessories", "footwear"].map((category) => (
                        <label key={category} className="flex font-medium items-center gap-2">
                            <input
                                type="checkbox"
                                onChange={() => handleFilter("category", category)}
                                checked={filter.category ? filter.category.includes(category) : false}
                                value={category}
                                className="mr-2"
                            /> 
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductFilter;
