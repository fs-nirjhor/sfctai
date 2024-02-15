import { Navigate, Outlet, useLocation, useRouteLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "./../shared/Loading";
import { toast } from 'react-toastify';

const PrivateRoute = () => {
  const user = useRouteLoaderData("user");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const checkAuthentication = async () => {
        if (user) {
          setLoading(false);
          setAuthenticated(true);
        } else {
        setLoading(false);
        toast.error(("Please login"))
      }
    }
    checkAuthentication();
  }, [user]);
 
  // return conditionally
  if (loading) {
    return <Loading />;
  }
  if (authenticated) {
    return <Outlet />;
  } 
  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;

