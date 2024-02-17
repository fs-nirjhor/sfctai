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
      /* await axios.post(`${serverUrl}/api/apk/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }); */
      axios.request({
        method: "post", 
        url: `${"https://syai.onrender.com"}/api/apk/upload`, 
        data: formData, 
        onUploadProgress: p => {
          const progress = p.loaded / p.total;
  
          // check if we already displayed a toast
          if (toastId.current === null) {
            toastId.current = toast('Upload in Progress', { progress, hideProgressBar: false });
          } else {
            toast.update(toastId.current, { progress });
          }
        }
      })
      //toast.success("File uploaded successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form className="join input-sm">
      <input
        type="file"
        onChange={handleFileChange}
        className="file-input file-input-bordered file-input-primary join-item"
      />
      <button onClick={handleUpload} className="join-item btn">
        Upload
      </button>
    </form>
  );
};

export default SetApk;
