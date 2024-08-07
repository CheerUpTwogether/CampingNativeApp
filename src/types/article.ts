type Article = {
  id: number;
  title: string;
  content: string;
  create_date: string;
  images: [key: string];
  favorite_count: number;
};

type ArticleFavoriteAId = {
  article_id: number;
};

type ArticleDetail = {
  id: number;
  title: string;
  content: string;
  create_date: string;
  images: [key: string];
  favorite_count: number;
  iconState: boolean;
};

interface ArticleFlatListProps {
  articles: Article[];
  myFavoriteArticles: ArticleFavoriteAId[];
}

interface ArticlesReponse {
  result: Article[];
}
