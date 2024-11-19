function AdminOrderDetails({ setOpen }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white rounded-lg p-6  w-full max-w-md mx-4 shadow-lg">
                <div className="flex items-center my-2 justify-between">
                    <p className="font-medium">Order ID</p>
                    <label>123456</label>
                </div>
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>
                <div className="flex items-center my-2 justify-between">
                    <p className="font-medium">Order Date</p>
                    <label>14/11/2024</label>
                </div>
                <div className="flex items-center my-2 justify-between">
                    <p className="font-medium">Order Price</p>
                    <label>$120</label>
                </div>
                <div className="flex items-center my-2 justify-between">
                    <p className="font-medium">Order Status</p>
                    <label>Pending</label>
                </div>
                <hr />
                <div className = "grid gap-4">
                    <div className = "grid gap-3">
                        <div className="flex justify-start font-medium">Order Details</div>
                            <ul className = "grid gap-3">
                                <li className="flex items-center my-2 justify-between">
                                    <span className="font-medium text-gray-400">Product One</span>
                                    <label>$100</label>
                                </li>
                            </ul>
                    </div>
                </div>
                <hr />
                    <div className = "grid gap-4">
                        <div className = "grid gap-3">
                            <div className="flex  font-medium">Shipping Info</div>
                                <div className = "flex flex-col justify-start gap-0.5 text-muted-foreground"> 
                                <span className="font-medium text-gray-400">Jhones</span>
                                <span className="font-medium text-gray-400">Address</span>
                                <span className="font-medium text-gray-400">city</span>
                                <span className="font-medium text-gray-400">state</span>
                                <span className="font-medium text-gray-400">pincode</span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className = "grid gap-2">
                        <div className="flex  font-medium ">Order Status</div>
                        <select className = "p-2 hover:border ">
                            <option value = "pending">pending </option>
                            <option value = "pending">In Progress </option>
                            <option value = "pending">In shipping </option>
                            <option value = "pending">Delivered </option>
                            <option value = "pending">Rejected </option>
                        </select>
                        <button className = "text-white rounded-md p-2 bg-blue-950">Update Order Status</button>
                    </div>
            </div>
        </div>
    );
}

export default AdminOrderDetails;
