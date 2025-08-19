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
        src={`https://iframe.mediadelivery.net/embed/481836/${videoId}?token=01d75945fc9a9d07989cdb18e6cf6d963c89bfa9fe96dfb0a8199c3664afa090&expires=1754904437&autoplay=true&loop=false&muted=false&preload=true&responsive=true`}
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
