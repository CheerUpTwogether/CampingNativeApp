type Article = {
  id: string;
  title: string;
  content: string;
  createDate: string;
  isFavorite: boolean;
  articleImages: { id: number; imgPath: string }[];
};

interface ArticleFlatListProps {
  articles: Article[];
}

interface ArticlesReponse {
  result: Article[];
}
