import { toast } from "react-toastify";
import { authApi } from "./axiosApi";

const userLoader = async () => {
  const getUser = async () => {
    let user;
    try {
      toast.loading("Authenticating...", {autoClose: false, toastId: "user-loading"});
      // Get the logged in user
      const loggedUser = await authApi.get("protected-route");
      if (loggedUser.data?.success) {
        user = loggedUser.data?.payload.user;
      } else {
        // handle 15 days inactivity
        const refreshedUser = await authApi.get("refresh-token");
        user = refreshedUser.data?.payload.user;
      }
      toast.dismiss("user-loading");
      return user;
    } catch (err) {
      toast.dismiss("user-loading");
      return false;
    }
  };
  return getUser();
};

export default userLoader;
