import AlertBox from "./AlertBox";

const ShowAlert = () => {
  return (
    <>
      {/* success alerts */}
      <AlertBox
        id="update-success"
        text="Update Successful"
        alertType="alert-success"
      />
      <AlertBox
        id="withdraw-success"
        text="Withdraw Successful"
        alertType="alert-success"
      />
      <AlertBox
        id="bind-success"
        text="Binding successfull"
        alertType="alert-success"
      />
      <AlertBox
        id="order-success"
        text="Trade Successful"
        alertType="alert-success"
      />
      <AlertBox
        id="recharge-success"
        text="Recharge Successful"
        alertType="alert-success"
      />
      <AlertBox
        id="delete-success"
        text="Delete Successful"
        alertType="alert-success"
      />
      <AlertBox
        id="loading-alert"
        text="Please wait..."
        alertType="alert-info"
      />

      {/* error alert */}
      <AlertBox
        id="private-router-error"
        text="Please login"
        alertType="alert-error"
      />
      <AlertBox
        id="network-error"
        text="Network Error"
        alertType="alert-error"
      />
      <AlertBox
        id="configuration-error"
        text="Configuration failed"
        alertType="alert-error"
      />
    </>
  );
};
export default ShowAlert;
