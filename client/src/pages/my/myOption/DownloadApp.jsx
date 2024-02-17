import { Link } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";
import { toast } from "react-toastify";
import { allApi } from "../../../router/axiosApi";
import { BsDownload } from "react-icons/bs";
import { serverUrl } from "../../../data/config";

const DownloadApp = () => {

  const handleClick = async () => {
    event.preventDefault();
    try {
    await allApi.get("download-app");
      window.location.assign(`${serverUrl}/api/download-app`);
      toast.success("Download Started");
    } catch (err) {
      if (err.response?.data.message) {
        toast.error(err.response.data.message); // error sent by server
      } else {
        toast.error(err.message); // other error
      }
    }
  };

  return (
    <>
    <Link 
      to={`${serverUrl}/api/download-app`}
      className="flex justify-between p-3 border-b-2 border-b-mySecondary text-black font-serif"
    >
      <p className="text-start">
        <BsDownload className="text-primary inline-block me-3 text-2xl" />
        <span>Download App</span>
      </p>
      <IoChevronForward />
    </Link>
    </>
  );
};
export default DownloadApp;
