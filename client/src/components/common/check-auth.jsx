
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  console.log("check auth");

  if (!isAuthenticated && (location.pathname.includes('/admin') || location.pathname.includes('/shop'))) {
      console.log("not wuthenticated");
      return <Navigate to="/login" />;
  }

  if (isAuthenticated &&
    (location.pathname.includes('/login') || location.pathname.includes('/signup'))) {
        console.log("working");
        if (user?.role === 'admin') {
            return <Navigate to="/admin/dashboard" />;
        }
        return <Navigate to="/shop/home" />;
    }
    
    if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('/admin')) {
      console.log("not admin");
      return <Navigate to="/unauth-page" />;
    }
    
    if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('/shop')) {
      console.log("not user");
      return <Navigate to="/admin/dashboard" />;
    }
    
    console.log("not working");
  return <>{children}</>;
}


export default CheckAuth;
