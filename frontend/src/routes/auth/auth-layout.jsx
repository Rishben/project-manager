import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../provider/auth-context";
const AuthLayout = () => {
  const {isAuthenticated, isLoading} =useAuth()

  if(isAuthenticated){
    return <Navigate to="/dashboard"/>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};
 
export default AuthLayout;