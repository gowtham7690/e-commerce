import { Outlet } from "react-router-dom";
import ShoppingHeader from './header.jsx';
function Shopping() {
    return ( <>
    <ShoppingHeader />
    <main>
        <Outlet />
    </main>
    </> );
}

export default Shopping;