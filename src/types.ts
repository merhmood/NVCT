import { StaticImageData } from "next/image";

type ArticleType = {
  id: string;
  video: string;
  title: string;
  creators: string[];
  tags: string[];
  metadata: {
    description: string;
    keywords: string;
    authors: { name: string }[];
  };
};

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Defines the shape with values necessary to increase the articles
interface IncreaseArticle {
  articlesCursor: number;
  articles: ArticleType[];
  setRenderedArticles: React.Dispatch<React.SetStateAction<ArticleType[]>>;
  setArticleCursor: React.Dispatch<React.SetStateAction<number>>;
  isSession: boolean;
  sessionCursor?: number;
  cursorValue: number;
}

export type { ArticleType, Props, IncreaseArticle };
