import { useRef, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../../data/config";
import { toast } from 'react-toastify';

const SetApk = () => {
  const [file, setFile] = useState(null);
  const toastId = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      axios.request({
        method: "post", 
        url: `${serverUrl}/api/apk/upload`, 
        data: formData, 
        onUploadProgress: p => {
          const progress = p.loaded / p.total;
  
          // check if we already displayed a toast
          if (toastId.current === null) {
            toastId.current = toast.loading('Upload in Progress', { progress, hideProgressBar: false, closeOnClick: false, draggable: false, progressClassName: "h-3" });
          } else {
            toast.update(toastId.current, { progress });
          }
        }
      }).then(data => {
        toast.done(toastId.current);
        if(data.data?.success){
        setFile(null);
        toast.success("File uploaded successfully");
        }
      })
    } catch (error) {
      toast.error(error.message);
    }
  };

  const inputStyle =
    "file-input file-input-primary file-input-sm join-item w-4/6";
  const formStyle = "join shadow-md w-full mb-4";
  const buttonStyle =
    "btn btn-sm join-item w-2/6";

  return (
    <form className={formStyle}>
      <input
        type="file"
        onChange={handleFileChange}
        className={inputStyle}
        accept=".apk"
        required
      />
      <button onClick={handleUpload} className={buttonStyle}>
        Upload
      </button>
    </form>
  );
};

export default SetApk;
