import { toast } from "react-toastify";
import { configurationApi } from "./axiosApi";

const configurationLoader = async () => {
      const getConfiguration = async () => {
        try {
          toast.loading("Configuring...", {toastId: "configuration-loading"});
          // Get the site configuration
          const response = await configurationApi.get();
          toast.dismiss("configuration-loading");
          if (response.data?.success) {
            const configuration = response.data?.payload.configuration; 
            return configuration;
          } else {
            toast.error("Configuration failed")
            return null;
          }
        } catch (err) {
          toast.dismiss("configuration-loading");
          toast.error(err.message);
         return null;
        }
      }
      return getConfiguration();
};

export default configurationLoader;
