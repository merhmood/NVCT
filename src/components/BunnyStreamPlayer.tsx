"use client";

import React, { useEffect, useRef } from "react";

interface BunnyStreamPlayerProps {
  videoId: string;
}

declare global {
  interface Window {
    playerjs: any;
  }
}

const BunnyStreamPlayer: React.FC<BunnyStreamPlayerProps> = ({ videoId }) => {
  return (
    <div style={{ position: "relative", paddingTop: "56.25%" }}>
      <iframe
        src={`https://iframe.mediadelivery.net/embed/479044/${videoId}?token=204f458062fc5ba45e1722aa60a50b9d79ef8df227a14b9721e0a731e704277b&expires=1754904437&autoplay=true&loop=false&muted=false&preload=true&responsive=true`}
        loading="lazy"
        style={{
          border: 0,
          position: "absolute",
          top: 0,
          height: "100%",
          width: "100%",
        }}
        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default BunnyStreamPlayer;
