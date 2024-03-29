
// TYPE
export type Article = {
  author: string | null;   
  content: string | null;
  description: string | null;
  publishedAt: string | null;
  source: {
    id: string | null;
    name: string | null;
  };
  title: string | null;
  url: string | null;
  urlToImage: string | null;
  isFavourite?: boolean | null;
};

// Detta är till listan som kommer med alla articles.
export type Articles = {
  articles: Article[]; 
  status?: string; 
  totalResults?: number; 
}