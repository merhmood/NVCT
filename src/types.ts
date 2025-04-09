type ArticleType = {
  id: string;
  video: string;
  title: string;
  duration: string;
  quality: string;
  type: string;
  thumbnailFrame: number;
  creators: string[];
  tags: string[];
  description: string;
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
