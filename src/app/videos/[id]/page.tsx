import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { ArticleType, Props } from "@/types";

import Article from "@/components/Article";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/url";

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const data = await fetch(`${BASE_URL}/data.json`);
  const response: { articles: [] } = await data.json();
  const article: ArticleType[] = response.articles.filter(
    (article: ArticleType) => article.id === id
  ); // extracts the article based on the article id;

  return {
    title: article[0] ? article[0].title : "",
    keywords: article[0] ? [...article[0].tags, ...article[0].creators] : [],
    description: article[0] ? article[0].description : "",
  };
}

export default function page({ params, searchParams }: Props) {
  return (
    <main>
      <div>
        <Article />
      </div>
    </main>
  );
}
