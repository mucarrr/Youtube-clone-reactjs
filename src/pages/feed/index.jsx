import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import api from "../../utils/api";
import { useSearchParams } from "react-router-dom";
import Card from "../../components/Card";
import Error from "../../components/Error";
import Loader from "../../components/Loader";

const Feed = () => {
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState(null);

  const [params] = useSearchParams();
  const active = params.get("category");

  useEffect(() => {
    setVideos(null);

    const url = !active
      ? "/home"
      : active === "trending"
      ? "/trending"
      : `/search?query=${active}`;

    api
      .get(url)
      .then((res) => setVideos(res.data.data))
      .catch((err) => setError(err.message));
  }, [active]);
  return (
    <div className="flex">
      <Sidebar />
      <div className="videos">
        {error ? (
          <Error msg={error} />
        ) : !videos ? (
          <Loader />
        ) : (
          videos.map((i, key) => <Card key={key} item={i} />)
        )}
      </div>
    </div>
  );
};

export default Feed;
