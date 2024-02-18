import { useEffect, useState } from "react";
import { allApi } from "../../../../router/axiosApi";
import Loading from "../../../shared/Loading";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("No users found");
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

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
      <section className="sticky top-0 bg-myBg pb-5">
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
        <div className="flex justify-between items-center">
          <button
            className={`btn btn-sm ${!pagination.previous && "btn-disabled"}`}
            onClick={() => pagination.previous && setPage(pagination.previous)}
          >
            Previous
          </button>
          <div className="font-medium join bg-white w-40">
            <input
              type="number"
              className="input input-sm input-bordered w-1/2 join-item"
              value={page}
              onChange={(e) => setPage(e.target.value)}
              required
            />
            <span className="join-item input input-sm border-s-2 border-s-primary">{pagination.totalPage || 0}</span>
          </div>
          <button
            className={`btn btn-sm ${!pagination.next && "btn-disabled"}`}
            onClick={() => pagination.next && setPage(pagination.next)}
          >
            Next
          </button>
        </div>
      </section>
      <div>
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
      </div>
    </div>
  );
};
export default ClientList;
