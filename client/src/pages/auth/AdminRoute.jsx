import { Outlet, useRouteLoaderData, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminRoute = () => {
  const user = useRouteLoaderData("user");

  // return conditionally
  if (!user.isAdmin) {
     toast.error("Only for Admin")
     return <Navigate to="/"/>
  } else {
  return <Outlet />;
  }
};

export default AdminRoute;

