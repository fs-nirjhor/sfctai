import { toast } from "react-toastify";
import { configurationApi } from "./axiosApi";

const configurationLoader = async () => {
      const getConfiguration = async () => {
        try {
          toast.loading("Configuring...", {autoClose: false, toastId: "configuration-loading"});
          // Get the site configuration
          const response = await configurationApi.get();
          if (response.data?.success) {
            const configuration = response.data?.payload.configuration; 
            toast.dismiss("configuration-loading");
            return configuration;
          } else {
            toast.update("configuration-loading", { render: "Configuration failed", type: "error", isLoading: false });
            return null;
          }
        } catch (err) {
          toast.update("configuration-loading", { render: err.message, type: "error", isLoading: false });
         return null;
        }
      }
      return getConfiguration();
};

export default configurationLoader;
