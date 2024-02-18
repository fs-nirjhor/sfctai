import { useEffect, useState } from "react";
import { allApi } from "../../../../router/axiosApi";
import Loading from "../../../shared/Loading";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../../../shared/Pagination";

const ClientList = () => {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("No users found");
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getClients = async () => {
      try {
        const response = await allApi.get(
          `users?search=${search}&page=${page}&limit=10`
        );
        if (response.data?.success) {
          setClients(response.data.payload.users);
          setPagination(response.data.payload.pagination);
          setMessage(response.data.message);
        }
        setLoading(false);
      } catch (err) {
        setClients([])
        setPagination({})
        setMessage("No users found")
        setLoading(false);
        if (err.response.data.message) {
          toast.error(err.response.data.message); // error sent by server
        } else {
          toast.error(err.message); // other error
        }
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
      <section className="sticky top-0 bg-myBg pb-3">
        <h1 className="font-semibold text-center pt-2 mb-5">Client List</h1>
        <div className="w-full max-w-lg mx-auto mb-3 shadow-md" >
          <input
            type="text"
            placeholder="Search Clients"
            className="input input-bordered border-primary w-full"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <p className="text-center text-white mb-2 font-semibold">{message}</p>
        <Pagination page={page} setPage={setPage} pagination={pagination}/>
      </section>
      <section>
        {clients.map((client) => {
          return (
            <Link
              to={`/client/${client.userId}`}
              key={client._id}
              className={`hover:bg-mySecondary p-2 border-b-2 block shadow-sm ${
                client.transaction?.balance >= 10 ||
                client.transaction?.isOrderPending
                  ? "text-myPrimary"
                  : "text-black"
              }`}
            >
              {client.name}
            </Link>
          );
        })}
      </section>
    </div>
  );
};
export default ClientList;
