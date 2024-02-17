import { Link, useNavigate } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";
import { toast } from "react-toastify";
import { allApi } from "../../../router/axiosApi";
import { BsDownload } from "react-icons/bs";
import { serverUrl } from "../../../data/config";

const DownloadApp = () => {
    const navigate = useNavigate();

  const handleClick = async () => {
    event.preventDefault();
    try {
      const result = await allApi.get("download-app");
      console.log(result)
      window.location.replace(`${serverUrl}/api/download-app`);
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
      className="flex justify-between p-3 border-b-2 border-b-mySecondary text-black font-serif"
      onClick={handleClick}
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
