import "./spinner.css";

const Loading = ({ text }) => {
  return (
    <section className="flex justify-center align-middle max-h-fit py-20">
      <div className="rounded shadow text-center bg-black text-white bg-opacity-60 px-3 py-1 aspect-square">
        <figure className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </figure>
        <p className="text-white text-center">{text || "Loading..."}</p>
      </div>
    </section>
  );
};
export default Loading;
