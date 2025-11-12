import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Article } from "../store/types";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate(`/articles/${article.slug}`);


  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer rounded-2xl bg-white/10 p-4 backdrop-blur-md transition hover:bg-white/20"
    >
      {article.thumbnail && (
        <img
          src={article.thumbnail}
          alt={article.title}
          className="mb-3 h-48 w-full rounded-xl object-cover"
        />
      )}
      <h2 className="text-lg font-semibold">{article.title}</h2>
      <p className="line-clamp-3 text-sm text-gray-300">{article.content}</p>
      <div className="mt-3 flex justify-between text-xs text-gray-400">
        <span>{article.category}</span>
        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default ArticleCard;
