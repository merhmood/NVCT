"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayerModal";
import axios from "axios";

interface Video {
  thumbnail: string;
  videoId: string;
  coins: number; // cost per view
}

export default function CreatorPage() {
  const params = useParams();
  const creator = (params?.creator as string).replace("-", " ");
  const [videos, setVideos] = useState<Video[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  // Mock user coin balance
  const [userCoins, setUserCoins] = useState(0);

  useEffect(() => {
    if (!creator) return;
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/data.json");
        const creatorData = response.data.find(
          (item: any) => item.creator.toLowerCase() === creator.toLowerCase()
        );
        if (creatorData) {
          setVideos(creatorData.videos || []);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, [creator]);

  useEffect(() => {
    const getCoins = async () => {
      const uid = localStorage.getItem("uid");
      if (!uid) return console.error("No UID in localStorage!");
      try {
        // ✅ GET request with query param
        const response = await axios.get(
          `/api/user-coins/${uid}`,
          { withCredentials: true } // still send cookies if needed
        );

        console.log("Success:", response.data);
        setUserCoins(response.data.coinsBalance);
      } catch (error) {
        console.error("Request failed:", error);
      }
    };
    getCoins();
  }, []);

  const handlePlayVideo = (video: Video) => {
    if (userCoins < video.coins) {
      alert("❌ Insufficient coins to view this content.");
      return;
    }

    const viewContent = async () => {
      const response = await axios.post(
        "/api/deduct-coins",
        {
          uid: localStorage.getItem("uid"),
          coins: video.coins,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        // Deduct coins per view
        setUserCoins(response.data.coinsBalance);

        // Open modal with selected video
        setActiveVideo(video);
        setShowModal(true);
      }
    };
    viewContent();
  };

  return (
    <div className="mb-5">
      <h1 className="text-2xl font-bold mb-4">{creator}&apos;s Videos</h1>
      <p className="mb-4">💰 Coins: {userCoins}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-start">
        {videos.map((video, index) => (
          <div
            key={index}
            className="cursor-pointer shadow-purple-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg"
            onClick={() => handlePlayVideo(video)}
          >
            {
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={video.thumbnail}
                alt={`Video ${index + 1}`}
                width={300}
                height={180}
                className="w-full max-h-48 object-cover"
              />
            }
            <div className="p-2">
              <p className="text-white font-semibold">
                ▶ Watch — {video.coins} coins
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <VideoPlayer
            videoId={activeVideo.videoId}
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setActiveVideo(null);
            }}
          />
        </div>
      )}
    </div>
  );
}
