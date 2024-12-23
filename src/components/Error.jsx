import React from "react";

const Error = ({ msg }) => {
  return (
    <div className="bg-red-500 h-fit rounded p-4  flex flex-col gap-5 mt-44 mx-auto text-center">
      <p>Something went wrong. Please try again.</p>
      <h2 className="font-semibold">{msg}</h2>
    </div>
  );
};

export default Error;
