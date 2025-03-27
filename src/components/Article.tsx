"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import VideoJS from "./VideoJS";

import { ArticleType } from "@/types";
import Link from "next/link";
import jaccardSimilarity from "@/utils/jaccardSimilarity";
import fluidPlayer from "fluid-player";

const Article = () => {
  const id = usePathname().split("/")[1]; // extracts article id from url path;
  const [article, setArticle] = useState<ArticleType>();
  const [moreArticles, setMoreArticles] = useState<ArticleType[]>();

  let self = useRef<HTMLVideoElement>(null);
  let player: FluidPlayerInstance | null = null;

  useEffect(() => {
    if (!player) {
      if (self.current) {
        player = fluidPlayer(self.current, {
          layoutControls: {
            primaryColor: "#ff99f3",
          },
          vastOptions: {
            adList: [
              {
                roll: "preRoll",
                vastTag: "https://s.magsrv.com/v1/vast.php?idzone=5571152",
              },
            ],
          },
        });
      }
    }
  });

  useEffect(() => {
    // Request articles and filter out the article chosen to read
    (async () => {
      const data = await fetch("/data.json");
      const response: { articles: ArticleType[] } = await data.json();
      const article: ArticleType[] = response.articles.filter(
        (article: ArticleType) => article.id === id
      );

      // Get similar articles to clicked article
      const moreArticles: ArticleType[] = [];
      for (let i = 0; i < response.articles.length - 1; i++) {
        if (moreArticles.length < 3) {
          const similarity = jaccardSimilarity(
            [...article[0].tags, ...article[0].creators],
            [...response.articles[i].tags, ...response.articles[i].creators]
          );
          console.log(similarity);
          if (similarity >= 0.3 && similarity !== 1) {
            moreArticles.push(response.articles[i]);
          }
        } else {
          break;
        }
      }

      setMoreArticles(moreArticles);
      setArticle(article[0]);
    })();
  }, [id]);

  return article ? (
    <section className="flex flex-col-reverse h-fit lg:gap-10 lg:flex-row lg:justify-between mt-24 lg:mt-32 mx-auto max-w-6xl w-5/6">
      <div className="basis-4/5">
        <Suspense fallback={<div className="my-10">Loading Article</div>}>
          <h2 className="mt-2 mb-5 text-base lg:text-2xl font-semibold">
            {article?.title}
          </h2>
          <div className="flex flex-wrap w-fit my-4 gap-2">
            {article && article.tags.length > 0
              ? article.tags.map((value, index) => (
                  <p
                    key={index}
                    className="bg-gray-100 text-black px-3 py-1 text-sm lg:text-base"
                  >
                    {value}
                  </p>
                ))
              : "Unknown"}
          </div>
          <div className="w-full">
            {article && (
              <video ref={self} className="w-full">
                <source
                  src={article.video}
                  data-fluid-hd
                  title={article.title}
                  type="video/mp4"
                />
              </video>
            )}
          </div>
          <div className="w-fit px-3 py-1 mt-4 bg-[#611364] text-[#fff]">
            Creator(s):{" "}
            {article && article.creators.length > 0
              ? article.creators.map(
                  (value, index) =>
                    `${value}${index < article.creators.length - 1 ? ", " : ""}`
                )
              : "Unknown"}
          </div>
        </Suspense>
        <div className="mt-8 lg:mt12 w-full">
          <h3 className="mb-2">More Videos for you</h3>
          <div className="overflow-x-scroll lg:overflow-hidden article-scroll">
            <div className="flex lg:flex-wrap gap-2 lg:gap-4">
              {moreArticles &&
                moreArticles.length > 0 &&
                moreArticles.map((article, index) => (
                  <article
                    key={index}
                    className="p-3 basis-44 lg:basis-64 mb-3 shrink-0 md:basis-80 bg-[#ff99f3]  text-[#1d071b] rounded-lg"
                  >
                    <Link href={`/${article.id}`} className="block">
                      <div className="relative h-fit mb-3s">
                        <video
                          src={article.video}
                          className="rounded-md object-cover h-24 md:h-36 w-full"
                        ></video>
                        <div className="absolute top-0 w-full h-full"></div>
                      </div>
                      <p className="text-sm lg:text-base hover:font-medium">
                        {article.title}
                      </p>
                    </Link>
                  </article>
                ))}
            </div>
          </div>
        </div>
        <div className="relative mt-1 mb-5">
          <iframe
            src="//a.magsrv.com/iframe.php?idzone=5571162&size=300x250"
            className="object-contain"
            scrolling="no"
          ></iframe>
          <p className="absolute top-0 left-2 font-bold">Ads</p>
        </div>
      </div>
      <div className="basis-1/5 mb-5 lg:mb-0">
        <div className="relative mt-1 mb-5">
          <iframe
            src="//a.magsrv.com/iframe.php?idzone=5571162&size=300x250"
            className="object-contain"
            scrolling="no"
          ></iframe>
          <p className="absolute top-0 left-2 font-bold">Ads</p>
        </div>
        <div className="hidden lg:block relative mt-1 mb-5">
          <iframe
            src="//a.magsrv.com/iframe.php?idzone=5571162&size=300x250"
            className="object-contain"
            scrolling="no"
          ></iframe>
          <p className="absolute top-0 left-2 font-bold">Ads</p>
        </div>
        <div className="hidden lg:block relative mt-1 mb-5">
          <iframe
            src="//a.magsrv.com/iframe.php?idzone=5571162&size=300x250"
            className="object-contain"
            scrolling="no"
          ></iframe>
          <p className="absolute top-0 left-2 font-bold">Ads</p>
        </div>
      </div>
    </section>
  ) : (
    <div className="my-10">Loading Article</div>
  );
};

export default Article;
