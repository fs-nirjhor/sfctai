import { Outlet, useRouteLoaderData, Navigate } from "react-router-dom";

const AdminRoute = () => {
  const user = useRouteLoaderData("user");

  // return conditionally
  if (!user.isAdmin) {
     document.getElementById("admin-route-error").showModal();
     return <Navigate to="/"/>
  } else {
  return <Outlet />;
  }
};

export default AdminRoute;

