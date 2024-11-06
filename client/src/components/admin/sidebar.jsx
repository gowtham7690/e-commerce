import {ChartNoAxesCombined , Shell , Dumbbell , Store} from "lucide-react";
import { useNavigate } from "react-router-dom";
function MenuItems(){
    const navigate = useNavigate();
    return (<nav className = "flex flex-col px-3  mt-6 gap-2">
        <div id = "dashboard" onClick = {() => {
            navigate('/admin/dashboard')
        }} className = "flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">
        <Store />
            <span>Dashboard</span>
        </div>
        <div id = "orders" onClick = {() => {
            navigate('/admin/order')
        }} className = "flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">
          <Shell />
            <span >orders</span>
        </div>
        <div id = "products" onClick = {() => {
            navigate('/admin/product')
        }} className = "flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">
        <Dumbbell />
            <span>Products</span>
        </div>
    </nav>);
}
function Sidebar() {
    return ( <>
       
        <aside className="hidden w-64 flex-col border-r bg-background lg:flex">
            <div className = " flex items-center gap-2 px-3 pt-4  ">
            <ChartNoAxesCombined size ={30}/>
            <h1 className = "text-[20px] ">admin pannel</h1>
            </div>
            <MenuItems />

        </aside>
        </>);
}

export default Sidebar;