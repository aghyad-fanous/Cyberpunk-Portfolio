import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { clearSelectedArticle, fetchArticleBySlug } from "../store/slices/articlesSlice";
import { GlassCard } from "../components/GlassCard";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const { selectedArticle: article, loading } = useAppSelector((state) => state.articles);

  useEffect(() => {
    if (slug) dispatch(fetchArticleBySlug(slug));

    // تنظيف عند مغادرة الصفحة
    return () => {
      dispatch(clearSelectedArticle());
    };
  }, [slug, dispatch]);

  if (loading || !article) return <p>Loading...</p>;

  return (
   <GlassCard className="h-full ">
     <article className="mx-auto max-w-3xl p-6 ">
      {article.thumbnail && (
        <img
          src={article.thumbnail}
          alt={article.title}
          className="mb-6 w-full rounded-2xl object-cover"
        />
      )}
      <h1 className="mb-3 text-3xl font-bold">{article.title}</h1>
      <p className="mb-4 text-sm text-gray-400">
        {article.category} • {new Date(article.createdAt).toLocaleDateString()}
      </p>
      <div className="prose prose-invert max-w-none">
        {article.content}
      </div>
    </article>
   </GlassCard>
  );
};

export default ArticlePage;
