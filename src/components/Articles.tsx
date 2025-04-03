"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { ArticleType } from "@/types";
import ArticleItem from "./ArticleItem";
import BannerAds from "./BannerAds";
import Loader from "./Loader";
import Offline from "./Offline";

interface ArticlesProp {
  articles: ArticleType[];
  title?: string;
  wrap?: boolean;
  ads?: number;
  showAll?: boolean;
  showLoader?: boolean;
  finishLoading?: boolean;
}

const Articles = ({
  articles,
  title,
  wrap,
  ads,
  showAll,
  showLoader,
  finishLoading,
}: ArticlesProp) => {
  const [offline, setOffline] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Adjust as needed

  useEffect(() => {
    offlineHandler(setOffline);
    innerWidth > 800 && setItemsPerPage(12);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const paginatedArticle = articles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return articles && articles.length > 0 && finishLoading ? (
    <section className="mb-10 lg:mb-8">
      <h2 className=" mb-4 text-lg lg:text-2xl font-semibold">{title}</h2>
      <div className="w-full overflow-x-scroll lg:overflow-hidden article-scroll">
        {" "}
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2`}>
          {paginatedArticle.map((article, index) => (
            <React.Fragment key={index}>
              <ArticleItem article={article} />
              {index + 1 === ads && wrap && (
                <div className="col-span-2 md:col-span-3 lg:col-span-4 relative w-full mb-5">
                  <BannerAds />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      {
        /* Pagination Controls */
        showAll && (
          <div className="flex flex-wrap justify-center space-x-2 mt-6 lg:mt-8 text-sm lg:text-base">
            <button
              onClick={() => {
                setCurrentPage(1);
              }}
              disabled={currentPage === 1}
              className="px-3 py-1 border bg-transparent rounded-md disabled:hidden"
            >
              First
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === index + 1
                    ? "bg-[#6d2867] text-white"
                    : "bg-transparent"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border bg-transparent rounded-md disabled:hidden"
            >
              Last
            </button>
          </div>
        )
      }
      {wrap && !showAll && (
        <div className="mt-4 py-3 rounded-full bg-[#6d2867]">
          <Link
            href={"/videos"}
            className="block w-full text-[#fff] text-base lg:text-lg text-center hover:font-bold"
          >
            See more
          </Link>
        </div>
      )}
    </section>
  ) : articles.length <= 0 && finishLoading ? (
    <p className="text-center">
      Sorry no video, try searching for something else 😅
    </p>
  ) : !offline ? (
    showLoader && <Loader />
  ) : (
    <Offline />
  );
};

function offlineHandler(
  setOffline: React.Dispatch<React.SetStateAction<boolean>>
): React.EffectCallback {
  return () => {
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
  };
}

export default Articles;
