"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArticleType } from "@/types";

const Articles = ({
  articles,
  title,
  wrap,
}: {
  articles: ArticleType[];
  title: string;
  wrap?: boolean;
}) => {
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    // Handles network state accordingly
    window.addEventListener("offline", () => {
      setOffline(true);
    });
    window.addEventListener("online", () => {
      setOffline(false);
    });
    return () => {
      window.removeEventListener("offline", () => setOffline(true));
      window.removeEventListener("online", () => setOffline(false));
    };
  }, []);

  return (
    <section className="w-5/6 max-w-5xl h-fit mx-auto mt-4">
      <h2 className=" mb-4 text-base lg:text-2xl font-semibold">{title}</h2>
      <div className="w-full overflow-x-scroll lg:overflow-hidden article-scroll">
        {" "}
        <div
          className={`flex ${
            wrap && "flex-wrap justify-center lg:justify-start"
          } lg:flex-wrap gap-2`}
        >
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <article
                key={index}
                className={`${
                  !wrap ? "basis-48" : "basis-36"
                } md:basis-80 mb-6 shrink-0`}
              >
                <Link href={`/${article.id}`} className="block">
                  <div className="relative mb-3">
                    <video
                      src={article.video}
                      className="rounded-md object-cover"
                    ></video>
                    <div className="absolute top-0 w-full h-full"></div>
                  </div>
                  <p
                    className={`text-blue-700 ${
                      wrap && "text-xs"
                    } text-sm lg:text-base hover:font-medium`}
                  >
                    {article.title}
                  </p>
                </Link>
              </article>
            ))
          ) : !offline ? (
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
          ) : (
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
          )}
        </div>
      </div>
    </section>
  );
};

export default Articles;
