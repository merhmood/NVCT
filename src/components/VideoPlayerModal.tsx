"use client";

import React from "react";
import Modal from "react-modal";
import "video.js/dist/video-js.css";
import BunnyStreamPlayer from "./BunnyStreamPlayer";

interface VideoPlayerModalProps {
  videoId: string; // Bunny CDN signed URL
  isOpen: boolean;
  onClose: () => void;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  videoId,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      style={{
        content: {
          background: "transparent",
          padding: 0,
          border: "none",
          height: "100%",
          display: "grid",
          placeItems: "center",
        },
        overlay: { zIndex: 1000, backgroundColor: "rgba(0,0,0,0.75)" },
      }}
      ariaHideApp={false}
    >
      <div className="relative bg-black w-full lg:w-4/6 -mt-20">
        <BunnyStreamPlayer
          videoId={videoId} // Assuming videoUrl is the video ID for BunnyStream
        />
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 10,
            background: "rgba(255,255,255,0.7)",
            border: "none",
            borderRadius: "50%",
            width: 30,
            height: 30,
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </div>
    </Modal>
  );
};

export default VideoPlayerModal;
