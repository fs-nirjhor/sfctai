const HandleAuthentication = ({ client, setReload }) => {
  const isPhoto =
    client?.authentication?.frontPhoto && client?.authentication?.backPhoto;
  const isAuthenticated = client?.authentication?.isAuthenticated;
  return (
    <section>
      <div className="flex justify-between">
        <h3 className="mb-3 font-semibold">
          {isAuthenticated ? "Authenticated" : "Not Authenticated"}
        </h3>
        <input type="checkbox" className="toggle toggle-success" />
      </div>
      {isPhoto ? (
        <div className="flex justify-between max-w-md gap-3 mx-auto my-2 font-semibold text-center text-xs">
          <figure>
            <p>Front Photo</p>
            <img
              src={client?.authentication?.frontPhoto}
              alt="frontPhoto"
              className="mt-2"
            />
          </figure>
          <figure>
            <p>Back Photo</p>
            <img
              src={client?.authentication?.backPhoto}
              alt="backPhoto"
              className="mt-2"
            />
          </figure>
        </div>
      ) : (
        <p className="text-center my-2">No Photo</p>
      )}
    </section>
  );
};
export default HandleAuthentication;
