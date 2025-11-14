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
      className="cursor-pointer rounded-2xl bg-white/10 p-3 sm:p-4 md:p-5 backdrop-blur-md transition hover:bg-white/20"
    >
      {article.thumbnail && (
        <img
          src={article.thumbnail}
          alt={article.title}
          className="mb-3 h-40 sm:h-48 md:h-56 w-full rounded-xl object-cover"
        />
      )}
      <h2 className="text-base sm:text-lg md:text-xl font-semibold line-clamp-2">{article.title}</h2>
      <p className="line-clamp-3 text-xs sm:text-sm text-gray-300 mt-2">{article.content}</p>
      <div className="mt-3 flex flex-col sm:flex-row gap-2 justify-between text-xs text-gray-400">
        <span className="truncate">{article.category}</span>
        <span className="shrink-0">{new Date(article.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default ArticleCard;
