import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { TiArrowSortedDown } from "react-icons/ti";
import millify from "millify";

const Comments = ({ videoId, video }) => {
  const [comments, setComments] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const params = {
      id: videoId,
    };
    api
      .get("/comments", { params })
      .then((res) => setComments(res.data.data))
      .catch((err) => setError(err));
  }, [videoId]);

  return (
    <div className="my-6">
      {error ? (
        <p>Comments could not be loaded!</p>
      ) : !comments ? (
        <p>Comments loading..</p>
      ) : comments.length === 0 ? (
        <p>No comment</p>
      ) : (
        <div>
          <h2 className="text-xl font-bold">
            {millify(video.commentCount)} Comments
          </h2>
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full bg-transparent border-b border-secondary outline-none p-2 mb-5"
          />
          {comments.map((comment) => (
            <div
              key={comment.commentId}
              className="flex gap-2 sm:gap-3 items-start px-1 py-3 sm:py-4 "
            >
              <img
                src={comment.authorThumbnail[0].url}
                className="rounded-full size-8 sm:size-10"
              />
              <div className="flex flex-col gap-2">
                <h5 className="flex gap-2 items-center">
                  <span className="font-semibold">{comment.authorText}</span>
                  <span className="text-gray-500 text-sm">
                    {comment.publishedTimeText}
                  </span>
                </h5>
                <p className="whitespace-pre-wrap">{comment.textDisplay}</p>
                <div className="flex gap-5 items-center">
                  <div className="flex gap-1 items-center hover:bg-secondary py-1 px-2 cursor-pointer rounded">
                    <AiOutlineLike />
                    <span>{comment.likesCount}</span>
                  </div>
                  <div className=" hover:bg-secondary py-1 px-2 cursor-pointer rounded">
                    <AiOutlineDislike />
                  </div>
                </div>

                {comment.replyCount > 0 && (
                  <div className="flex w-fit items-center p-1 rounded-md gap-2 text-blue-500 hover:bg-secondary cursor-pointer">
                    <TiArrowSortedDown />
                    {comment.replyCount} reply
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Comments;
