import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { toast } from "react-toastify";
import { userApi } from "../../../router/axiosApi";
import Spinner from "../../shared/Spinner";
import {
  useRouteLoaderData,
  useRevalidator,
  useNavigate,
} from "react-router-dom";
import { useForm } from "react-hook-form";

const Authentication = () => {
  const user = useRouteLoaderData("user");
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const frontPhoto = watch("frontPhoto");
  const backPhoto = watch("backPhoto");
  // variables
  const isApprovedOrPending =
    user?.authentication?.status === "approved" ||
    user?.authentication?.status === "pending";
  // handler
  const onSubmit = async (data) => {
    event.preventDefault();
    try {
      // validation
      if (processing) {
        return;
      }
      if (!frontPhoto || !backPhoto) {
        return toast.error("Please capture your NID");
      }
      if (user?.authentication?.status === "pending") {
        return toast.error("NID already submitted. Please wait for approval");
      }
      if (user?.authentication?.status === "approved") {
        return toast.error("NID is already approved");
      }
      //data
      const formData = new FormData();
      formData.append("frontPhoto", data.frontPhoto[0]);
      formData.append("backPhoto", data.backPhoto[0]);
      formData.append("email", user.email || data.email);
      //progressbar
      toast.loading(<Spinner text="Uploading.." />, {
        hideProgressBar: false,
        closeOnClick: false,
        draggable: false,
        progressClassName: "h-3",
        toastId: "authentication-loading",
      });
      const onUploadProgress = (progressEvent) => {
        const progress = progressEvent.loaded / progressEvent.total;
        toast.update("authentication-loading", { progress });
      };
      setProcessing(true);
      // request
      const res = await userApi.post(`upload-nid/${user?._id}`, formData, {
        onUploadProgress,
      });
      setProcessing(false);
      if (res.data?.success) {
        toast.success("NID successfully uploaded");
        revalidator.revalidate();
        navigate("/my");
      }
    } catch (err) {
      setProcessing(false);
      if (err.response?.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  };

  return (
    <section className="px-2">
      <h1 className="font-semibold text-center pt-2 mb-5">Authentication</h1>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <div className="label">
            <span className="font-semibold">Front Photo of NID</span>
          </div>
          <label className="form-control w-40 mx-auto">
            <div className="relative ">
              <span
                className={`absolute bg-gray-300 bg-opacity-80 w-full h-full flex justify-center items-center rounded ${
                  frontPhoto?.length && "bg-green-500"
                }`}
              >
                <GoPlus className="text-6xl text-white" />
              </span>
              <div className="w-full aspect-video" />
            </div>
            <input
              type="file"
              accept="image/*"
              name="frontPhoto"
              className="hidden"
              capture
              {...register("frontPhoto", {
                required: true,
              })}
            />
            {errors.frontPhoto && (
              <div className="label">
                <span className="label-text-alt"></span>
                <span className="label-text-alt text-error font-medium">
                  Please capture front side of NID
                </span>
              </div>
            )}
          </label>
        </div>
        <div className="w-full">
          <div className="label">
            <span className="font-semibold">Back Photo of NID</span>
          </div>
          <label className="form-control w-40 mx-auto">
            <div className="relative ">
              <span
                className={`absolute bg-gray-300 bg-opacity-80 w-full h-full flex justify-center items-center rounded ${
                  backPhoto?.length && "bg-green-500"
                }`}
              >
                <GoPlus className="text-6xl text-white" />
              </span>
              <div className="w-full aspect-video" />
            </div>
            <input
              type="file"
              accept="image/*"
              name="backPhoto"
              className="hidden"
              capture
              {...register("backPhoto", {
                required: true,
              })}
            />
            {errors.backPhoto && (
              <div className="label">
                <span className="label-text-alt"></span>
                <span className="label-text-alt text-error font-medium">
                  Please capture back side of NID
                </span>
              </div>
            )}
          </label>
        </div>
        <div className={`w-full ${user.email && "hidden"}`}>
          <div className="label">
            <span className="font-semibold">Email Address</span>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className="input input-bordered border-myPrimary w-full"
            required
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && (
            <div className="label">
              <span className="label-text-alt"></span>
              <span className="label-text-alt text-error font-medium">
                Please enter your email
              </span>
            </div>
          )}
        </div>
        <label className="form-control w-full max-w-md mx-auto">
          <button
            type="submit"
            className={`btn btn-myPrimary font-semibold w-full mt-5 ${
              processing && "btn-disabled"
            }`}
          >
            Submit
          </button>
        </label>
      </form>
    </section>
  );
};
export default Authentication;
