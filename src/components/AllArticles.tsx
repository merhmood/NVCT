"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import type { ArticleType, IncreaseArticle } from "@/types";

const AllArticles: React.FC = () => {
  const [articles, setArticles] = useState<Array<ArticleType>>([]);
  const [renderedArticles, setRenderedArticles] = useState<Array<ArticleType>>(
    []
  );
  const [articlesCursor, setArticleCursor] = useState(0);
  const [offline, setOffline] = useState(false);
  const [cursorValue, setCursorValue] = useState(0);

  useEffect(() => {
    const cursorValue = 6;
    setCursorValue(cursorValue);
    // Fetch data and set them in reverse order, also handles
    // rendering the first set of articles to the screen
    (async () => {
      const data = await fetch("/data.json");
      const response: { articles: [] } = await data.json();
      setArticles(response.articles);

      // Creates increase article object with common value.
      const increaseArticle = {
        articlesCursor,
        setRenderedArticles,
        setArticleCursor,
        articles: response.articles,
      };

      // Load articles based on session storage article cursor
      const sessionArticleCursor = sessionStorage.getItem("article-cursor");
      if (sessionArticleCursor && parseInt(sessionArticleCursor) > 0) {
        const sessionArticleCursorNumber = parseInt(sessionArticleCursor);

        addArticlesToScreen({
          ...increaseArticle,
          cursorValue,
          isSession: true,
          sessionCursor: sessionArticleCursorNumber,
        });
      } else {
        addArticlesToScreen({
          ...increaseArticle,
          cursorValue,
          isSession: false,
        });
      }
    })();
  }, [offline]);

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

  const addMoreHandler = () => {
    const increaseArticle: IncreaseArticle = {
      articlesCursor,
      articles,
      setRenderedArticles,
      setArticleCursor,
      cursorValue,
      isSession: false,
    };
    addArticlesToScreen(increaseArticle);
  };

  return (
    <section className="w-5/6 max-w-5xl mx-auto">
      <div className="flex items-start flex-wrap gap-2 lg:gap-4 justify-center lg:justify-start">
        {renderedArticles.length > 0 ? (
          renderedArticles.map((article, index) => (
            <React.Fragment key={index}>
              <article
                className={`p-2 basis-36 md:basis-80 shrink-0 bg-[#ff99f3]  text-[#1d071b] rounded-lg`}
              >
                <Link href={`/${article.id}`}>
                  <div className="relative mb-3">
                    <video
                      src={article.video}
                      className="rounded-md object-cover h-24 md:h-36 w-full"
                    ></video>
                    <div className="absolute top-0 w-full h-full"></div>
                  </div>
                  <p className="text-xs lg:text-base hover:font-medium">
                    {article.title}
                  </p>
                </Link>
              </article>
              {(index + 1) % 3 === 0 && (
                <div className="basis-36 md:basis-80 mb-6 shrink-0">Ads</div>
              )}
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
      {articlesCursor < articles.length && (
        <button
          className="block text-center font-semibold w-full mb-5 lg:mb-7"
          onClick={addMoreHandler}
        >
          Add more
        </button>
      )}
    </section>
  );
};

function addArticlesToScreen(increase: IncreaseArticle) {
  const {
    articles,
    articlesCursor,
    isSession,
    setArticleCursor,
    setRenderedArticles,
    sessionCursor,
    cursorValue,
  } = increase;
  const articlesToRender: ArticleType[] = [];

  // Increase the cursor value by if it hasn't exceed the articles length
  // otherwise the newArticlesCursorPosition will be set to the articles length
  // value
  const newArticlesCursor = isSession
    ? sessionCursor
    : articlesCursor + cursorValue < articles.length
    ? articlesCursor + cursorValue
    : articles.length;

  if (newArticlesCursor) {
    // Adds articles to renderedArticles
    for (let i = 0; i < newArticlesCursor; i++) {
      articlesToRender.push(articles[i]);
    }
    // Adds newArticleCursor to session storage
    sessionStorage.setItem("article-cursor", newArticlesCursor.toString());

    setRenderedArticles([...articlesToRender]);
    setArticleCursor(newArticlesCursor);
  }
}

export default AllArticles;
