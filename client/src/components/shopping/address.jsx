import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getAddress, addAddress, deleteAddress, updateAddress } from '../../store/shop/address-slice';

export default function Address() {
    const dispatch = useDispatch();
    const { user } = useSelector((data) => data.auth);
    const [addresses, setAddresses] = useState([]);
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
        e.preventDefault();
        if (formData.addressId) {
            await dispatch(updateAddress({ userId: user.id, addressId: formData.addressId, formData }));
        } else {
            await dispatch(addAddress({ userId: user.id, Address: formData.Address, city: formData.city, state: formData.state, pincode: formData.pincode, phone: formData.phone }));
        }
        fetchAddresses();
        clearForm();
    };
    const handleDelete = async (addressId) => {
        await dispatch(deleteAddress({ userId: user.id, addressId }));
        fetchAddresses();
    };

    const handleUpdate = (address) => {
        setFormData({
            addressId: address._id,
            Address: address.Address,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
            phone: address.phone
        });
    };

    const clearForm = () => {
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
            <div className="w-full max-w-md mb-6">
                {addresses.map((address) => (
                    <div key={address._id} className="bg-gray-100 shadow-md rounded-lg p-4 mb-4">
                        <p><strong>Address:</strong> {address.Address}</p>
                        <p><strong>City:</strong> {address.city}</p>
                        <p><strong>State:</strong> {address.state}</p>
                        <p><strong>Pincode:</strong> {address.pincode}</p>
                        <p><strong>Phone:</strong> {address.phone}</p>
                        <div className = "flex justify-between">
                            <button
                                onClick={() => handleUpdate(address)}
                                className="text-white bg-black rounded-md p-2 hover:text-red-700 font-bold mt-2 mr-2"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(address._id)}
                                className="text-red-500 hover:text-red-700 font-bold mt-2"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Address form */}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
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
                    {formData.addressId ? 'Update Address' : 'Add Address'}
                </button>
                {formData.addressId && (
                    <button
                        type="button"
                        onClick={clearForm}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                    >
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
}
