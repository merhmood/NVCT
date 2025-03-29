import React from "react";

const Loader = () => {
  return (
    <div className="grid place-items-center w-full h-full -mt-4">
      <div>
        <video
          className="h-16 w-16"
          src="/loading.webM"
          muted
          autoPlay
          loop
        ></video>
      </div>
      <p className="text-sm text-center lg:text-base">Loading ...</p>
    </div>
  );
};

export default Loader;
