"use client";

import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );
        if (!res.ok) throw new Error("Failed to fetch properties data");
        const data = await res.json();
        setProperties(data.properties);
        setTotalItems(data.total);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [page, pageSize]);

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  return (
    <section className="px-4 py-6">
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="container-xl lg:container m-auto px-4 py-6">
          {properties.length === 0 ? (
            <p>No Properties Found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div>
                  <PropertyCard property={property} key={property._id} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <Pagination page={page} pageSize={pageSize} totalItems={totalItems} onPageChange={handlePageChange} setLoading={setLoading}/>
    </section>
  );
}

export default Properties;
