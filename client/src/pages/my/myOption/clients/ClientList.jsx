import { useEffect, useState } from "react";
import { allApi } from "../../../../router/axiosApi";
import Loading from "../../../shared/Loading";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("0/0");
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClients = async () => {
      try {
        const response = await allApi.get(`users?search=${search}&page=${page}&limit=10`);
        console.log(response.data);
        if (response.data?.success) {
          setClients(response.data.payload.users);
          setPagination(response.data.payload.pagination);
          setMessage(response.data.message);
        }
        setLoading(false);
      } catch (err) {
        if (err.response.data.message) {
          toast.error(err.response.data.message); // error sent by server
        } else {
          toast.error(err.message); // other error
        }
        setLoading(false);
      }
    };
    getClients();
  }, [search, page]);

const handleSearch = (text) => {
  event.preventDefault();
  setSearch(text);
  setPage(1);
};

  return loading ? (
    <Loading />
  ) : (
    <div className="pb-20">
      <section className="sticky top-0 bg-myBg pb-5">
      <h1 className="font-semibold text-center pt-2 mb-5">Client List</h1>
      <div className="max-w-md mx-auto mb-3">
        <input
          type="text"
          placeholder="Search Clients"
          className="input input-bordered border-myPrimary w-full"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-between items-center">
        <button className={`btn btn-sm ${!pagination.previous && "btn-disabled"}`} onClick={() => pagination.previous && setPage(pagination.previous)}>Previous</button>
        <p className="font-medium">{message}</p>
        <button className={`btn btn-sm ${!pagination.next && "btn-disabled"}`} onClick={() => pagination.next && setPage(pagination.next)}>Next</button>
      </div>
      </section>
      <div>
        {clients.map((client) => {
          return (
            <Link
              to={`/client/${client.userId}`}
              key={client._id}
              className={`hover:bg-mySecondary p-2 border-b-2 block shadow-sm ${
                client.transaction?.balance >= 10 || client.transaction?.isOrderPending
                  ? "text-myPrimary"
                  : "text-black"
              }`}
            >
              {client.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default ClientList;
