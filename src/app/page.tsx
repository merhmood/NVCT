"use client";

import React, { useEffect, useState } from "react";
import { Metadata } from "next";

import Navigation from "@/components/Navigation";
import Articles from "@/components/Articles";
import Footer from "@/components/Footer";

import type { ArticleType } from "@/types";
import Link from "next/link";

export default function Page() {
  const [articles, setArticles] = useState<Array<ArticleType>>([]);

  useEffect(() => {
    // Fetch data and set them in reverse order, also handles
    // rendering the first set of articles to the screen
    (async () => {
      const data = await fetch("/data.json");
      const response: { articles: [] } = await data.json();
      setArticles(response.articles);
    })();
  }, []);

  return (
    <main className="flex flex-col justify-between h-screen">
      <div>
        <Navigation />
        <div className="mt-32 w-5/6 max-w-5xl mx-auto">
          <Link
            href="https://www.instagram.com/nuttyvibes"
            className="lg:hidden text-blue-700 text-sm my-4 text-center"
            target="_blank"
          >
            Follow us on Instagram.
          </Link>
        </div>
        <Articles
          articles={[...articles].reverse().slice(0, 3)}
          title="Newly Updated"
        />
        <div>
          <Articles
            articles={
              // Pass 3 articles for large screen and 4 articles for small screen
              innerWidth < 800 ? articles.slice(0, 4) : articles.slice(0, 3)
            }
            title="Older videos"
            wrap
          />
          <div className="mt-2 w-5/6 max-w-5xl mx-auto">
            <Link
              href={"/all-videos"}
              className="block w-full text-[#611364] text-sm lg:text-lg text-center hover:font-bold"
            >
              See more videos
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
