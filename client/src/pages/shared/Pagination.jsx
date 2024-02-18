const Pagination = ({pagination, page, setPage}) => {
  return (
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
            <span className="join-item input input-sm border-s-2 border-s-primary">
              {pagination.totalPage || 0}
            </span>
          </div>
          <button
            className={`btn btn-sm ${!pagination.next && "btn-disabled"}`}
            onClick={() => pagination.next && setPage(pagination.next)}
          >
            Next
          </button>
        </div>
  )
}
export default Pagination