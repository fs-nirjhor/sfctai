import { authApi } from "./axiosApi";

const userLoader = async () => {
  const getUser = async () => {
    let user;
    try {
      document.getElementById("loading-alert")?.showModal();
      // Get the logged in user
      const loggedUser = await authApi.get("protected-route");
      if (loggedUser.data?.payload.access) {
        user = loggedUser.data?.payload.user;
      } else {
        // handle 15 days inactivity
        const refreshedUser = await authApi.get("refresh-token");
        user = refreshedUser.data?.payload.user;
      }
      document.getElementById("loading-alert")?.close();
      return user;
    } catch (err) {
      document.getElementById("loading-alert")?.close();
      return false;
    }
  };
  return getUser();
};

export default userLoader;
