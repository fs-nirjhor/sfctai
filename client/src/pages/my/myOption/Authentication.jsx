import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { toast } from "react-toastify";

const Authentication = () => {
  const [processing, setProcessing] = useState(false);
  const [frontside, setFrontside] = useState(null);
  const [backside, setBackside] = useState(null);
  const handleSubmit = async () => {
    event.preventDefault();
    try {
      if (!frontside || !backside) {
        toast.error("Please capture your NID");
      }
      const data = {
        backside,
        frontside,
      };
      //await sendMessage(data);
      setFrontside(null);
      setBackside(null);
    } catch (err) {
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
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="w-full">
          <div className="label">
            <h3 className="font-semibold">Frontside of NID</h3>
          </div>
          <label className="form-control w-40 mx-auto">
            <div className="relative ">
              <span
                className={`absolute bg-gray-300 bg-opacity-80 w-full h-full flex justify-center items-center rounded ${
                  frontside?.length && "hidden"
                }`}
              >
                <GoPlus className="text-6xl text-white" />
              </span>
              <div className="w-full aspect-video" />
            </div>
            <input
              type="file"
              accept="image/*"
              name="frontside"
              className="hidden"
              capture
              required
              onChange={(e) => setFrontside(e.target.files[0])}
            />
          </label>
        </div>
        <div className="w-full">
          <div className="label">
            <h3 className="font-semibold">Backside of NID</h3>
          </div>
          <label className="form-control w-40 mx-auto">
            <div className="relative ">
              <span
                className={`absolute bg-gray-300 bg-opacity-80 w-full h-full flex justify-center items-center rounded ${
                  backside?.length && "hidden"
                }`}
              >
                <GoPlus className="text-6xl text-white" />
              </span>
              <div className="w-full aspect-video" />
            </div>
            <input
              type="file"
              accept="image/*"
              name="backside"
              className="hidden"
              onChange={(e) => setBackside(e.target.files[0])}
              capture
              required
            />
          </label>
        </div>
        <label className="form-control w-full max-w-md mx-auto">
          <button
            type="submit"
            className={`btn bg-white text-black font-semibold w-full mt-5 ${
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
