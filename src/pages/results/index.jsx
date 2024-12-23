import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";
import Error from "../../components/Error";
import BasicLoader from "../../components/BasicLoader";
import Card from "../../components/Card";

const Results = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);
  const [page, setPage] = useState(1);

  const [params] = useSearchParams();
  const query = params.get("search_query");

  useEffect(() => {
    setLoading(true);
    const params = { query, token: page > 1 ? token : undefined };
    api
      .get("./search", { params })
      .then((res) => {
        setData((prev) => [...prev, ...res.data.data]),
          setToken(res.data.continuation);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [query, page]);

  useEffect(() => {
    setData([]);
    setToken(null);
    setPage(1);
  }, [query]);

  return (
    <div className="p-4 sm:p-6 md:p-10 h-[93vh] overflow-y-auto">
      <h2 className="text-xl mb-5">
        <span className="font-bold me-2">Results for</span>
        <span>{query}</span>
      </h2>

      {error && <Error msg={error} />}
      {loading && <BasicLoader />}

      <div className="wrapper flex flex-col gap-5 justify-center">
        {data.map((item, key) => (
          <Card key={key} item={item} isRow /* isRow={true} */ />
        ))}
      </div>

      {loading && <BasicLoader />}

      <div className="flex justify-center my-10">
        {!loading && (
          <button
            className="bg-zinc-600 py-2 px-5 rounded-md hover:bg-zinc-800 transition"
            onClick={() => setPage(page + 1)}
          >
            More
          </button>
        )}
      </div>
    </div>
  );
};

export default Results;
