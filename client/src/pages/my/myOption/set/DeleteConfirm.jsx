import { useState } from "react";
import AlertBox from './../../../shared/AlertBox';
import { useNavigate } from "react-router-dom";
import { userApi } from "../../../../router/axiosApi";

const DeleteConfirm = ({id}) => {
    const [error, setError] = useState("");
  const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
          const res = await userApi.delete(id);
          if (res.data?.success) {
            document.getElementById("delete-success").showModal();
            navigate(-1);
          }
        } catch (err) {
          if (err.response?.data.message) {
            setError(err.response.data.message); // error sent by server
          } else {
            setError(err.message); // other error
          }
          document.getElementById("delete-error").showModal();
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
          <p className="mb-5 text-center">
            Do you want to delete this user?
          </p>
          <button
            className="btn ms-auto block btn-warning bg-myPrimary text-white"
            onClick={handleDelete}
          >
            Confirm
          </button>
        </figure>
      </div>
      <AlertBox id="delete-error" text={error} alertType="alert-error" />
    </dialog>
  );
};
export default DeleteConfirm;
