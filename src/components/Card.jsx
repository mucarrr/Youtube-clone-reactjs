import millify from "millify";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ item, isRow }) => {
  const [isHover, setIsHover] = useState(false);
  if (item.type !== "video") return null;

  return (
    <Link
      to={`/watch?v=${item.videoId}`}
      className={isRow ? "row" : "grid gap-[20px]"}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div>
        {isHover && item.richThumbnail ? (
          <img src={item.richThumbnail && item.richThumbnail[0].url} />
        ) : (
          <img
            src={item.thumbnail[item.thumbnail.length - 1].url}
            className="rounded-lg w-full h-full"
          />
        )}
      </div>
      <div className="flex gap-4">
        <img
          src={item.channelThumbnail && item.channelThumbnail[0].url}
          className="size-14 rounded-full pp"
        />
        <div>
          <h4 className="font-bold line-clamp-1">{item.title}</h4>
          <p>{item.channelTitle}</p>
          <div className="flex gap-3 items-center">
            <p>
              <span>{millify(item.viewCount)}</span>
              <span className="text-sm ms-1 pp">views</span>
            </p>
            *
            {item.isLive ? (
              <p className="bg-red-500 py-0.5 px-2 rounded-lg">Live</p>
            ) : (
              <p>{item.publishedTimeText}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
