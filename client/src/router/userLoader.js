import { toast } from "react-toastify";
import { authApi } from "./axiosApi";

const userLoader = async () => {
  const getUser = async () => {
    let user;
    try {
      toast.loading("Authenticating...", { toastId: "user-loading" });
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
