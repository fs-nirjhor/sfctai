import { useState } from "react";
import { userApi } from "../../../../router/axiosApi";
import { useRouteLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

const SetAvatar = () => {
  const user = useRouteLoaderData("user");
  const [selectedAvatar, setSelectedAvatar] = useState(user);

  const images = [
    "/images/avatar/avatar1.png",
    "/images/avatar/avatar2.png",
    "/images/avatar/avatar3.png",
    "/images/avatar/avatar4.png",
  ];

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleSubmit = async () => {
    event.preventDefault();
    const updates = {};
    if (selectedAvatar) {
      updates.avatar = selectedAvatar;
    }
    try {
      const res = await userApi.put(user._id, updates);
      res.data?.success && toast.success("Avatar updated");
    } catch (err) {
      if (err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="form-control w-full max-w-md mx-auto">
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
          className="btn btn-secondary font-semibold w-full mt-2"
        >
          Change Avatar
        </button>
      </label>
    </form>
  );
};
export default SetAvatar;
