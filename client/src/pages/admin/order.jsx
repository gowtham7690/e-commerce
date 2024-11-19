import { useState } from "react";
import AdminOrder from "../../components/admin/order";

function Order() {
    const [open , setOpen] = useState(false);
    return ( <>
    <AdminOrder open = {open} setOpen = {setOpen}/>
    </> );
}

export default Order;