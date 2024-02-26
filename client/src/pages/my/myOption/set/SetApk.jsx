import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../../data/config";
import { toast } from 'react-toastify';

const SetApk = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    toast.loading('Upload in Progress', { hideProgressBar: false, closeOnClick: false, draggable: false, progressClassName: "h-3", toastId: "uploading" });
    try {

      const response = await axios.request({
        method: "post", 
        url: `${serverUrl}/api/apk/upload`, 
        data: formData, 
        onUploadProgress: p => {
          const progress = p.loaded / p.total;
            toast.update("uploading", { progress });
        }
      });
        if(response.data?.success){
        toast.success("File uploaded successfully");
        }
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to upload file");
      }
    }
    setFile(null);
    toast.done("uploading")
  };

  const inputStyle =
    "file-input file-input-primary file-input-sm join-item w-4/6";
  const formStyle = "join shadow-md w-full mb-4";
  const buttonStyle =
    "btn btn-sm join-item w-2/6";

  return (
    <form className={formStyle} onSubmit={handleUpload}>
      <input
        type="file"
        onChange={handleFileChange}
        className={inputStyle}
        accept=".apk"
        required
      />
      <button className={buttonStyle}>
        Upload
      </button>
    </form>
  );
};

export default SetApk;
