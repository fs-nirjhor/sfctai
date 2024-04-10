import { useEffect, useState } from "react";
import Loading from "../../shared/Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { allApi } from "../../../router/axiosApi";
import Pagination from "../../shared/Pagination";

const PendingNid = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getClients = async () => {
      try {
        const filter = { "authentication.status": "pending" };
        const response = await allApi.get(
          `users?search=pending&page=${page}&limit=10`,
          {
            filter,
          }
        );
        if (response.data?.success) {
          setClients(response.data.payload.users);
          setPagination(response.data.payload.pagination);
        }
        setLoading(false);
      } catch (err) {
        setClients([]);
        setPagination({});
        setLoading(false);
        if (err.response.data.message) {
          toast.error(err.response.data.message); // error sent by server
        } else {
          toast.error(err.message); // other error
        }
      }
    };
    getClients();
  }, [page]);

  return (
    <section className="pb-20 px-2">
      <section className="sticky top-0 bg-myBg pb-3">
        <h1 className="font-semibold text-center pt-2 mb-5">Pending NID</h1>
        <Pagination page={page} setPage={setPage} pagination={pagination} />
      </section>
      <div>
        {loading ? (
          <Loading />
        ) : !clients.length ? (
          <p className="text-gray-400 text-center p-5 h-screen font-bold">
            No Pending NID
          </p>
        ) : (
          clients.map((client) => {
            return (
              <p
                key={client._id}
                className="p-2 mb-1 rounded bg-mySecondary"
                onClick={() => navigate(`/client/${client._id}`)}
              >
                {client.name}
              </p>
            );
          })
        )}
      </div>
    </section>
  );
};
export default PendingNid;
