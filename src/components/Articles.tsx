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
          className={`flex items-start ${
            wrap && "grid grid-cols-2 lg:flex justify-evenly lg:justify-start"
          } lg:flex-wrap gap-2`}
        >
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <React.Fragment key={index}>
                <article
                  className={`${
                    !wrap ? "basis-48 p-3" : "basis-36 p-2"
                  } md:basis-80 shrink-0 bg-[#ff99f3]  text-[#1d071b] rounded-lg`}
                >
                  <Link href={`/${article.id}`} className="block">
                    <div className="relative mb-3">
                      <video
                        src={article.video}
                        className="rounded-md object-cover max-h-40 md:h-36 w-full"
                      ></video>
                      <div className="absolute top-0 w-full h-full"></div>
                    </div>
                    <p
                      className={`${
                        wrap && "text-xs"
                      } text-sm lg:text-base hover:font-medium`}
                    >
                      {article.title}
                    </p>
                  </Link>
                </article>
                {/* {(index + 1) % 3 === 0 && (
                  <div className="relative basis-36 md:basis-80 mb-6 shrink-0 grow">
                    <iframe
                      src="//a.magsrv.com/iframe.php?idzone=5571162&size=300x250"
                      className="object-contain"
                    ></iframe>
                    <p className="absolute top-0 left-2 font-bold">Ads</p>
                  </div>
                )} */}
              </React.Fragment>
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
