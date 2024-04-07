import { IoChevronForward } from "react-icons/io5";
import { BsDownload } from "react-icons/bs";
import { serverUrl } from "../../../configuration/config";

const DownloadApp = () => {
  return (
    <>
      <a
        className="flex justify-between p-3 border-b-2 border-b-mySecondary text-black font-serif"
        href={`${serverUrl}/api/apk/download`}
        download
      >
        <p className="text-start">
          <BsDownload className="text-myPrimary inline-block me-3 text-2xl" />
          <span>Download App</span>
        </p>
        <IoChevronForward />
      </a>
    </>
  );
};
export default DownloadApp;
