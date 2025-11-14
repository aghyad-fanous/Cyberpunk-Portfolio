import { Edit2, Trash2 } from 'lucide-react'
import { GlassCard } from './GlassCard'
import { Article } from '../store/types'

interface ArticleCardProps {
  article: Article
  onEdit?: (article: Article) => void
  onDelete?: (id: string) => void
}



const ArticleCard = ({ article, onEdit, onDelete }: ArticleCardProps) => {

  const showActions = !!onEdit && !!onDelete;

  return (
    <GlassCard>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-start">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1 min-w-0">
          {article.thumbnail && (
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full sm:w-24 h-48 sm:h-24 rounded-lg object-cover border border-accent-cyan/50 shrink-0"
            />
          )}

          <div className="min-w-0 flex-1">
            <h3 className="text-lg sm:text-xl font-semibold text-white line-clamp-2">{article.title}</h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 line-clamp-3">
              {article.content}
            </p>
            <p className="mt-3 text-xs text-gray-400">
              Category: {article.category}
            </p>
            <p className="mt-1 text-xs text-gray-500">By: {article.authorId}</p>
          </div>
        </div>

        {showActions && (
          <div className="flex gap-2 sm:gap-3 ml-0 sm:ml-4 shrink-0">
            <button onClick={()=>onEdit(article)} className="p-2 rounded border border-(--accent-cyan) hover:bg-[rgba(43,243,248,0.1)] transition-colors duration-200">
              <Edit2 className="w-4 h-4 text-(--accent-cyan)" />
            </button>
            <button onClick={()=>onDelete(article.id)} className="p-2 rounded border border-red-500 hover:bg-[rgba(239,68,68,0.1)] transition-colors duration-200">
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>
          </div>
        )}
      </div>
    </GlassCard>
  )
}

export default ArticleCard
