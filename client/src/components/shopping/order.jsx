import {useState} from 'react';
import ShopOrderDetails from './order-details';
export default function Order(){
    const [open , setOpen] = useState(false);
    return (<div className = "flex flex-col w-full">
        <h2 className = "font-bold text-center pb-4">orders History</h2>
        <table className = "border text-center border-black ">
            <thead className = "hover:bg-slate-100">
                <tr className = "text-gray-500 border m-2 border-black">
                    <th>Order Id</th>
                    <th>Order Date </th>
                    <th>Order Status</th>
                    <th>Order Price</th>
                    <th>
                        <span >Details</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className = "hover:bg-slate-100 m-2text-gray-500 border border-black">
                    <td>123456</td>
                    <td>14/11/2024</td>
                    <td>pending</td>
                    <td>$120</td>
                    <td>
                        <button onClick= {() => setOpen(true)} className = "m-2 p-2 bg-black text-white rounded-md">View Details</button>
                        { open && <ShopOrderDetails setOpen = {setOpen} />}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>)
}