"use client";

import React, { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import VideoJS from "./VideoJS";

import { ArticleType } from "@/types";
import Link from "next/link";
import jaccardSimilarity from "@/utils/jaccardSimilarity";

const Article = () => {
  const id = usePathname().split("/")[1]; // extracts article id from url path;
  const [article, setArticle] = useState<ArticleType>();
  const [moreArticles, setMoreArticles] = useState<ArticleType[]>();

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

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "/home.mp4",
        type: "video/mp4",
      },
    ],
  };

  return (
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
                    className="bg-gray-100 px-3 py-1 text-sm lg:text-base"
                  >
                    {value}
                  </p>
                ))
              : "Unknown"}
          </div>
          <div className="">
            {article && (
              <VideoJS
                options={{
                  ...videoJsOptions,
                  sources: [
                    {
                      src: article.video,
                      type: "video/mp4",
                    },
                  ],
                }}
              />
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
                    className="basis-44 lg:basis-64 mb-3 shrink-0"
                  >
                    <Link href={`/${article.id}`} className="block">
                      <div className="relative h-fit mb-3">
                        <video
                          src={article.video}
                          className="rounded-md object-cover"
                        ></video>
                      </div>
                      <p className="text-blue-700 text-sm lg:text-base hover:font-medium">
                        {article.title}
                      </p>
                    </Link>
                  </article>
                ))}
            </div>
          </div>
        </div>
        <div className="mt-5 mb-2">Ads space</div>
      </div>
      <div className="basis-1/5 mb-5 lg:mb-0">Ads space</div>
    </section>
  );
};

export default Article;
