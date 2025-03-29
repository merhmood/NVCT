import React from "react";

const Offline = () => {
  return (
    <div className="grid place-items-center w-full h-full -mt-4">
      <div>
        <video
          className="h-16 w-16"
          src="/offline.webM"
          muted
          autoPlay
          loop
        ></video>
      </div>
      <p className="text-xs lg:text-base text-center text-red-500">
        Currently offline
      </p>
    </div>
  );
};

export default Offline;
