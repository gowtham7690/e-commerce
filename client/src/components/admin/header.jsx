import {AlignJustify , LogOut} from "lucide-react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/auth-slice";
function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogOut = async() => {
        console.log("logout");
        const result = await dispatch(logoutUser());
        navigate('/login');
        console.log(result);
        
    }
    return( <header className = "flex items-center justify-between m-2 bg-background">
        <button className = "flex lg:hidden ">
            <AlignJustify />
        </button>
        <button onClick ={handleLogOut}>
            <LogOut />
            <span >logout</span>
        </button>
    </header>);
}

export default Header;