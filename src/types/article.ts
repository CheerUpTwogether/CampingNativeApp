type ArticleFavorite = {
  user_id: string;
  article_id: number;
  is_favorite: boolean;
};

type Article = {
  id: number;
  title: string;
  content: string;
  create_date: string;
  images: [key: string];
  article_favorite: ArticleFavorite[][];
};

interface ArticleFlatListProps {
  articles: Article[];
  setFavorite: (id: number) => void;
}

interface ArticlesReponse {
  result: Article[];
}

interface ArticleFavoriteResponse {
  success: boolean;
  result: Article;
}
