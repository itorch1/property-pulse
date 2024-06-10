function Pagination({ page, pageSize, totalItems, onPageChange, setLoading }) {
  const totalPages = Math.ceil(totalItems / pageSize);

  function handlePageChange(index) {
    if (index === -1 && page === 1) return;
    if (index === 1 && page === totalPages) return;
    onPageChange((page) => page + index);
    setLoading(true);
  }

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        className="mr-2 px-2 py-1 border border-gray-300 rounded disabled:bg-gray-300 disabled:opacity-50"
        disabled={page === 1}
        onClick={() => handlePageChange(-1)}
      >
        Previous
      </button>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <button
        className="ml-2 px-2 py-1 border border-gray-300 rounded disabled:bg-gray-300 disabled:opacity-50"
        disabled={page === totalPages}
        onClick={() => handlePageChange(1)}
      >
        Next
      </button>
    </section>
  );
}

export default Pagination;
