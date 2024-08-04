type Article = {
  id: number;
  title: string;
  content: string;
  createDate: string;
  isFavorite: boolean;
  articleImages?: { id: number; imgPath: string }[];
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
