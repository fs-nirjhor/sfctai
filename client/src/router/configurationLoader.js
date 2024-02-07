import { configurationApi } from "./axiosApi";

const configurationLoader = async () => {
      const getConfiguration = async () => {
        try {
          // Get the site configuration
          const response = await configurationApi.get();
          if (response.data?.success) {
            const configuration = response.data?.payload.configuration; 
            return configuration;
          } else {
            document.getElementById("configuration-error").showModal();
            return null;
          }
        } catch (err) {
         return null;
        }
      }
      return getConfiguration();
};

export default configurationLoader;
