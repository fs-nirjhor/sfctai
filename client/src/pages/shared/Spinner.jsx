import "./spinner.css";

const Spinner = ({ text }) => {
  return (
    <div>
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
  );
};
export default Spinner;
