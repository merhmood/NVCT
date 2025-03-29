"use client";

import React, { useEffect, useState } from "react";

import Navigation from "@/components/Navigation";
import Articles from "@/components/Articles";
import Footer from "@/components/Footer";

import type { ArticleType } from "@/types";
import Link from "next/link";

export default function Page() {
  const [articles, setArticles] = useState<Array<ArticleType>>([]);
  const [innerWidth, setInnerWidth] = useState<number | null>(null);

  useEffect(() => {
    // Fetch data and set them in reverse order, also handles
    // rendering the first set of articles to the screen
    (async () => {
      const data = await fetch("/data.json");
      const response: { articles: [] } = await data.json();
      setArticles(response.articles);
    })();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setInnerWidth(window.innerWidth);

      const handleResize = () => setInnerWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <main className="flex flex-col justify-between h-screen">
      <div>
        <Navigation />
        <div className="mt-28 lg:mt-32 h-[20vh] w-5/6 max-w-5xl mx-auto">
          <div className="relative mt-1 mb-5">
            <iframe
              src="//a.magsrv.com/iframe.php?idzone=5571162&size=auto"
              width="100%"
              height="100%"
            ></iframe>
            <p className="absolute top-0 left-2 font-bold">Ads</p>
          </div>
        </div>
        <Articles
          articles={[...articles].reverse().slice(0, 4)}
          title="Newly Updated"
        />
        <div>
          <Articles
            articles={
              // Pass 3 articles for large screen and 4 articles for small screen
              innerWidth && innerWidth < 800
                ? articles.slice(0, 8)
                : articles.slice(0, 10)
            }
            ads={innerWidth && innerWidth < 800 ? 6 : 8}
            title="Older videos"
            wrap
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
