const AlertBox = ({ id, text, alertType, position }) => {
  // onClick={()=> document.getElementById('AlertBox').showModal() }
  const alertClass = `alert text-white ${alertType || "!text-black"}`;
  const modalClass = `modal ${position || "modal-top"}`
  return (
    <dialog id={id || ""} className={modalClass}>
      <div className="modal-box p-0 mt-10 max-w-md bg-transparent mx-auto">
        <div role="alert" className={alertClass}>
          <p className="whitespace-pre-wrap">{text || ""}</p>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default AlertBox;
