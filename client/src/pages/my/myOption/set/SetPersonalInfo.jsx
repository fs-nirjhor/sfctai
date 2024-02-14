import { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { userApi } from "../../../../router/axiosApi";
import { toast } from 'react-toastify';
import SetAvatar from './SetAvatar';

const SetPersonalInfo = () => {
  const user = useRouteLoaderData("user");
  // updates
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);

  const handleClick = async (updates) => {
    event.preventDefault();
    try {
      toast.loading("Updating...", {toastId: "update-info-loading"});
      const res = await userApi.put(user._id,  updates );
      toast.dismiss("update-info-loading");
      if(res.data?.success) {
        setName("")
        setPhone("")
        setEmail("")
        toast.success("Updated successfully")
        }
    } catch (err) {
      toast.dismiss("update-info-loading");
        if (err.response.data.message) {
            toast.error(err.response.data.message);
        } else {
            toast.error(err.message);
        }
    }
  };
  
  const inputStyle =
    "input input-bordered input-sm border-myPrimary join-item w-4/6";
  const formStyle = "join shadow-md w-full mb-4";
  const buttonStyle =
    "btn btn-sm btn-warning bg-myPrimary text-white join-item w-2/6";

  return (
      <div>
        <h1 className="font-semibold text-center pt-2 mb-5">Modify Personal Info</h1>
        <div className="max-w-md mx-auto pb-20">
          {/* modify name */}
          <form
            className={formStyle}
            onSubmit={() => handleClick({ name })}
          >
            <input
              type="text"
              placeholder="Enter your real name"
              className={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <button type="submit" className={buttonStyle} >
              Update
            </button>
          </form>
          {/* modify phone */}
          <form
            className={formStyle}
            onSubmit={() => handleClick({ phone })}
          >
            <input
              type="tel"
              placeholder="Enter your phone number"
              className={inputStyle}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button type="submit" className={buttonStyle}>
              Update
            </button>
          </form>
          {/* modify email */}
          <form
            className={formStyle}
            onSubmit={() => handleClick({ email })}
          >
            <input
              type="number"
              placeholder="Enter your email address"
              className={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={buttonStyle}>
              Update
            </button>
          </form>
          {/* modify date of birth */}
          <form
            className={formStyle}
            onSubmit={() => handleClick({ dateOfBirth })}
          >
            <input
              type="date"
              className={inputStyle}
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
            <button type="submit" className={buttonStyle}>
              Update
            </button>
          </form>
          <SetAvatar />
        </div>
      </div>
  );
};
export default SetPersonalInfo;
