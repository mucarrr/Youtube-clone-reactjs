import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";

import ReactPlayer from "react-player";
import Channel from "./Channel";
import Description from "./Description";
import Comments from "./Comments";
import Error from "../../components/Error";
import Card from "../../components/Card";
import BasicLoader from "../../components/BasicLoader";
const Detail = () => {
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);

  const [params] = useSearchParams();
  const id = params.get("v");

  useEffect(() => {
    const params = { id, extend: 1 };
    api
      .get("/video/info", { params })
      .then((res) => setVideo(res.data))
      .catch((err) => setError(err.message));
  }, [id]);

  return (
    <div className="detail-page h-screen overflow-y-auto overflow-x-hidden">
      <div className="page-content">
        <div>
          <div className="h-[60vh] md:h-[50vh] lg:h-[60h] rounded overflow-hidden ">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              playing
              width="100%"
              height="100%"
            />
          </div>
          {error ? (
            <Error msg={error} />
          ) : !video ? (
            <BasicLoader />
          ) : (
            <div>
              <h1 className="my-3 text-xl font-bold">{video.title}</h1>
              <Channel video={video} />
              <Description video={video} />
              <Comments videoId={id} />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5 p-1">
          {video?.relatedVideos.data.map((item, key) => (
            <Card key={key} item={item} isRow={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
