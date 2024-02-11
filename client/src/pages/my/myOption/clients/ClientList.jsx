import { useEffect, useState } from "react";
import { allApi } from "../../../../router/axiosApi";
import Loading from "../../../shared/Loading";
import AlertBox from "../../../shared/AlertBox";
import { Link } from "react-router-dom";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClients = async () => {
      try {
        const response = await allApi.get(`users?search=${search}`);
        if (response.data?.success) {
          setClients(response.data.payload.users);
        }
        setLoading(false);
      } catch (err) {
        if (err.response.data.message) {
          setError(err.response.data.message); // error sent by server
        } else {
          setError(err.message); // other error
        }
        setLoading(false);
        document.getElementById("client-list-error").showModal();
      }
    };
    getClients();
  }, [search]);
  return loading ? (
    <Loading />
  ) : (
    <div className="pb-20">
      <h1 className="font-semibold text-center pt-2 mb-5">Client List</h1>
      <p className="text-center font-medium mb-3">
        Total Client {clients.length}
      </p>
      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search Clients"
          className="input input-bordered border-myPrimary w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
        />
      </div>
      <div>
        {clients.map((client) => {
          return (
            <Link
              to={`/client/${client.userId}`}
              key={client._id}
              className={`hover:bg-mySecondary p-2 border-b-2 block shadow-sm ${
                client.transaction?.balance >= 10
                  ? "text-myPrimary"
                  : "text-black"
              }`}
            >
              {client.name}
            </Link>
          );
        })}
      </div>
      <AlertBox id="client-list-error" text={error} alertType="alert-error" />
    </div>
  );
};
export default ClientList;
