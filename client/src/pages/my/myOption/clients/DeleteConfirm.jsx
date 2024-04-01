import { useNavigate } from "react-router-dom";
import { userApi } from "../../../../router/axiosApi";
import { toast } from "react-toastify";
import { useState } from "react";

const DeleteConfirm = ({ id }) => {
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const res = await userApi.delete(id);
      if (res.data?.success) {
        toast.success("Deleted Successfully");
        navigate(-1);
      }
    } catch (err) {
      if (err.response.data.message) {
        setProcessing(false);
        toast.error(err.response.data.message); // error sent by server
      } else {
        toast.error(err.message); // other error
      }
    }
  };

  return (
    <dialog id="delete_dialog" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <figure>
          <p className="mb-5 text-center">Do you want to delete this user?</p>
          <button
            className={`btn ms-auto block btn-warning bg-myPrimary text-white ${
              processing && "btn-disabled"
            }`}
            onClick={handleDelete}
          >
            {processing ? "Deleting..." : "Confirm"}
          </button>
        </figure>
      </div>
    </dialog>
  );
};
export default DeleteConfirm;
