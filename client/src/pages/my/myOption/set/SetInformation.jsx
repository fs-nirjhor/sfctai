import { useState } from "react";
import { useForm } from "react-hook-form";
import { userApi } from "../../../../router/axiosApi";
import { useRouteLoaderData } from "react-router-dom";
import AlertBox from "../../../shared/AlertBox";

const SetInformation = () => {
  const user = useRouteLoaderData("user");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const images = [
    "/images/avatar/avatar1.png",
    "/images/avatar/avatar2.png",
    "/images/avatar/avatar3.png",
    "/images/avatar/avatar4.png",
    "/images/avatar/avatar5.png",
    "/images/avatar/avatar6.png",
    "/images/avatar/avatar7.png",
    "/images/avatar/avatar8.png",
    "/images/avatar/avatar9.png",
    "/images/avatar/avatar10.png",
    "/images/avatar/avatar11.png",
    "/images/avatar/avatar12.png",
  ];

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const onSubmit = async (data) => {
    event.preventDefault();
    const updates = {};
    if (data.name) {
      updates.name = data.name;
    }
    if (selectedAvatar) {
      updates.avatar = selectedAvatar;
    }
    try {
      const res = await userApi.put(user._id, updates);
      res.data?.success &&
        document.getElementById("update-success").showModal();
    } catch (err) {
      if (err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
      document.getElementById("update-error").showModal();
    }
  };

  return (
    <section>
      <h1 className="text-lg font-semibold text-center pt-2 mb-5">
        Modify Information
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control w-full max-w-md mx-auto">
          <div className="label">
            <span className="label-text">Modify Name</span>
          </div>
          <input
            type="text"
            placeholder="Update your name"
            name="name"
            className="input bg-mySecondary w-full max-w-md text-center"
            {...register("name", {
              minLength: 3,
              maxLength: 10,
            })}
          />
          {errors.name && (
            <div className="label">
              <span className="label-text-alt"></span>
              <span className="label-text-alt text-error font-medium">
                Name must have 3-10 letters
              </span>
            </div>
          )}
        </label>

        <label className="form-control w-full max-w-md mx-auto">
          <div className="label">
            <span className="label-text">Modify Avatar</span>
          </div>
          <div className="grid grid-cols-4 gap-5 justify-between my-3">
            {images.map((avatar, index) => {
              const ringStyle =
                selectedAvatar === avatar
                  ? "h-16 w-16 rounded-full ring ring-primary"
                  : "h-16 w-16";
              return (
                <figure
                  className="avatar cursor-pointer"
                  key={index}
                  onClick={() => handleAvatarClick(avatar)}
                >
                  <div className={ringStyle}>
                    <img src={avatar} alt={`Avatar ${index + 1}`} />
                  </div>
                </figure>
              );
            })}
          </div>
        </label>

        <label className="form-control w-full max-w-md mx-auto">
          <button
            type="submit"
            className="btn btn-warning bg-myPrimary text-white font-semibold w-full mt-5"
          >
            Submit
          </button>
        </label>
      </form>
      <AlertBox id="update-error" text={error} alertType="alert-error" />
    </section>
  );
};
export default SetInformation;
