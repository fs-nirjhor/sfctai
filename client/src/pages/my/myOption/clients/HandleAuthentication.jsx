import { useState } from "react";
import { toast } from "react-toastify";
import { userApi } from "../../../../router/axiosApi";

const HandleAuthentication = ({ client, setReload }) => {
  const [processing, setProcessing] = useState(false);
  const isAuthenticated = client?.authentication?.isAuthenticated;
  const isPhoto =
    client?.authentication?.frontPhoto && client?.authentication?.backPhoto;
  const handleAuthentication = async () => {
    event.preventDefault();
    try {
      if (!processing) {
        const data = { "authentication.isAuthenticated": !isAuthenticated };
        setProcessing(true);
        const res = await userApi.put(client?._id, data);
        setProcessing(false);
        if (res.data?.success) {
          toast.success("Authentication updated");
          setReload((prev) => prev + 1);
        }
      }
    } catch (error) {
      toast.error(error.message);
      setProcessing(false);
    }
  };
  return (
    <section>
      <div className="flex justify-between">
        <h3
          className={`mb-3 font-semibold ${
            isAuthenticated ? "text-green-500" : "text-red-500"
          }`}
        >
          {isAuthenticated ? "Authenticated" : "Not Authenticated"}
        </h3>
        <input
          type="checkbox"
          className="toggle toggle-success"
          checked={isAuthenticated || false}
          onChange={handleAuthentication}
        />
      </div>
      {isPhoto ? (
        <div className="flex justify-between max-w-md gap-3 mx-auto my-2 font-semibold text-center text-xs">
          <figure>
            <p>Front Photo</p>
            <img
              src={client?.authentication?.frontPhoto}
              alt="frontPhoto"
              className="mt-2"
            />
          </figure>
          <figure>
            <p>Back Photo</p>
            <img
              src={client?.authentication?.backPhoto}
              alt="backPhoto"
              className="mt-2"
            />
          </figure>
        </div>
      ) : (
        <p className="text-center my-2">No Photo</p>
      )}
    </section>
  );
};
export default HandleAuthentication;
