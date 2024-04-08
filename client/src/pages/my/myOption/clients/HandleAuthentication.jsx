const HandleAuthentication = ({ client }) => {
  return (
    <section>
      <h3 className="mb-3 font-semibold">Authentication</h3>
      {client?.authentication?.frontPhoto &&
      client?.authentication?.backPhoto ? (
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
        <p className="text-center my-2">Not authenticated</p>
      )}
    </section>
  );
};
export default HandleAuthentication;
