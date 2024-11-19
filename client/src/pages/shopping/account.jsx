import accImg from "../../assets/account.jpg";
import { useState } from 'react';
import Order from "../../components/shopping/order";
import Address from "../../components/shopping/address";

function ShoppingAccount() {
    const [tag, setTags] = useState("Orders");

    return (
        <div className="flex flex-col">
            <div className="relative h-[350px] w-full overflow-hidden">
                <img src={accImg} className="h-full w-full object-cover object-center" alt="Account Background" />
            </div>
            <div className="mx-[125px] flex flex-col items-center lg:items-start lg:flex-row gap-8 py-8">
                <div className="flex flex-col rounded-lg  border md:justify:center md:align-center bg-background w-[250px] p-6">
                    <button onClick={() => setTags("dash")} className="p-4 text-left  hover:text-blue-800 rounded-lg">Dashboard</button>
                    <button onClick={() => setTags("order")} className="p-4 text-left  hover:text-blue-800 rounded-lg">Orders</button>
                    <button onClick={() => setTags("track")} className="p-4 text-left  hover:text-blue-800 rounded-lg">Track Your Orders</button>
                    <button onClick={() => setTags("address")} className="p-4 text-left  hover:text-blue-800 rounded-lg">My Address</button>
                    <button onClick={() => setTags("details")} className="p-4 text-left  hover:text-blue-800 rounded-lg">Account Details</button>
                    <button onClick={() => setTags("logout")} className="p-4 text-left hover:text-blue-800 rounded-lg">Logout</button>
                </div>

                <div className="flex w-full h-full  p-4 ">
                    {tag === "order" && <Order />}
                    {tag === "dash" && <p>Welcome to your dashboard!</p>}
                    {tag === "track" && <p>Track your orders here.</p>}
                    {tag === "address" && <Address />}
                    {tag === "details" && <p>Update your account details here.</p>}
                    {tag === "logout" && <p>You have logged out.</p>}
                </div>
            </div>
        </div>
    );
}

export default ShoppingAccount;
