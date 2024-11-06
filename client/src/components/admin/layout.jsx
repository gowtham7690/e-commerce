import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";

function Layout() {
    return ( <div className = "flex min-h-screen w-full">
        <Sidebar />
        <div className = "flex flex-col w-full">
        <Header /> 
            <main>
                <Outlet />
            </main>
        </div>
    </div>);
}

export default Layout;