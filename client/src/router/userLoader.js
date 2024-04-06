import { toast } from "react-toastify";
import { authApi } from "./axiosApi";
import Spinner from "../pages/shared/Spinner";

const userLoader = async () => {
  const getUser = async () => {
    let user;
    try {
      toast.loading(Spinner, {
        toastId: "user-loading",
      });
      // Get the logged in user
      const loggedUser = await authApi.get("protected-route");
      if (loggedUser.data?.success) {
        user = loggedUser.data?.payload.user;
        // set access token
        const accessToken = loggedUser.data?.payload.accessToken;
        localStorage.setItem("accessToken", accessToken);
      }
      toast.dismiss("user-loading");
      return user;
    } catch (err) {
      toast.dismiss("user-loading");
      toast.error("Please login");
      return false;
    }
  };
  return getUser();
};

export default userLoader;
