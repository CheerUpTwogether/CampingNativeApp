type Article = {
  id: number;
  title: string;
  contents: string;
  create_date: string;
  images: [key: string];
  is_liked: number;
  like_count: number;
};

type ArticleFavoriteAId = {
  article_id: number;
};

type ArticleDetail = {
  id: number;
  title: string;
  contents: string;
  create_date: string;
  images: [key: string];
  favorite_count: number;
  iconState: boolean;
};

interface ArticleFlatListProps {
  articles: Article[];
}

interface ArticlesReponse {
  result: Article[];
}
