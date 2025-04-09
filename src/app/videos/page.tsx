"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";

import Articles from "@/components/Articles";

import type { ArticleType } from "@/types";
import BannerAds from "@/components/BannerAds";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("video")?.replaceAll("+", " ");

  const [finishLoading, setFinishLoading] = useState(false);
  const [articles, setArticles] = useState<Array<ArticleType>>([]);
  const [innerWidth, setInnerWidth] = useState<number | null>(null);
  const [filteredArticles, setFilteredArticles] = useState<Array<ArticleType>>(
    []
  );

  useEffect(() => {
    // Fetch data and set them in reverse order, also handles
    // rendering the first set of articles to the screen
    (async () => {
      const data = await fetch("/data.json");
      const response: { articles: [] } = await data.json();
      setArticles(response.articles);

      if (query && query !== "") {
        // Configure fuzzy search options
        const fuse = new Fuse(response.articles, {
          keys: ["title", "tags", "creators"], // Search in multiple fields
          threshold: 0.3, // Lower is stricter, higher is fuzzier
        });

        const filteredArticles = fuse
          .search(query.trim())
          .map((result) => result.item);

        setFilteredArticles(filteredArticles);
      }
      setFinishLoading(true);
    })();
  }, [query]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setInnerWidth(window.innerWidth);

      const handleResize = () => setInnerWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <main>
      <div className="mt-36 lg:mt-32"></div>
      <BannerAds />
      <Articles
        articles={
          filteredArticles.length > 0
            ? filteredArticles
            : filteredArticles.length <= 0 && query
            ? []
            : [...articles].sort((a, b) => 0.5 - Math.random())
        }
        ads={innerWidth && innerWidth < 800 ? 4 : 8}
        wrap
        showAll
        showLoader
        finishLoading={finishLoading}
      />
    </main>
  );
}
