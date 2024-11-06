function ProductFilter({ filter, handleFilter }) {
    return (
        <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Filter</h2>

                <h3 className="text-md font-semibold mt-4">Brand</h3>
                <div className="flex flex-col gap-2">
                    <label className="flex font-medium items-center gap-2">
                        <input onChange={() => handleFilter("brand", "nike")} type="checkbox" value="nike" className="mr-2" /> Nike
                    </label>
                    <label className="flex font-medium items-center gap-2">
                        <input onChange={() => handleFilter("brand", "adidas")} type="checkbox" value="adidas" className="mr-2" /> Adidas
                    </label>
                    <label className="flex font-medium items-center gap-2">
                        <input onChange={() => handleFilter("brand", "puma")} type="checkbox" value="puma" className="mr-2" /> Puma
                    </label>
                    <label className="flex font-medium items-center gap-2">
                        <input onChange={() => handleFilter("brand", "levi")} type="checkbox" value="levi" className="mr-2" /> Levis
                    </label>
                    <label className="flex font-medium items-center gap-2">
                        <input onChange={() => handleFilter("brand", "zara")} type="checkbox" value="zara" className="mr-2" /> Zara
                    </label>
                    <label className="flex font-medium items-center gap-2">
                        <input onChange={() => handleFilter("brand", "hm")} type="checkbox" value="hm" className="mr-2" /> H&M
                    </label>
                </div>

                <h3 className="text-md font-semibold mt-4">Category</h3>
                <div className="flex flex-col gap-2">
                    <label className="flex font-medium items-center gap-2">
                        <input onChange={() => handleFilter("category", "men")} type="checkbox" value="men" className="mr-2" /> Men
                    </label>
                    <label className="flex font-medium items-center gap-2">
                        <input onChange={() => handleFilter("category", "women")} type="checkbox" value="women" className="mr-2" /> Women
                    </label>
                    <label className="flex font-medium items-center gap-2">
                        <input onChange={() => handleFilter("category", "kids")} type="checkbox" value="kids" className="mr-2" /> Kids
                    </label>
                    <label className="flex font-medium items-center gap-2">
                        <input onChange={() => handleFilter("category", "accessories")} type="checkbox" value="accessories" className="mr-2" /> Accessories
                    </label>
                    <label className="flex font-medium items-center gap-2">
                        <input onChange={() => handleFilter("category", "footwear")} type="checkbox" value="footwear" className="mr-2" /> Footwear
                    </label>
                </div>
            </div>
        </div>
    );
}

export default ProductFilter;
