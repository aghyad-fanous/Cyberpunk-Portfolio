import { Edit2, Trash2 } from "lucide-react";
import { Experience, Language } from "../store/types"; // تأكد من المسار الصحيح
import { GlassCard } from "./GlassCard";

// إضافة خصائص الإدارة (onEdit, onDelete)
interface TimelineItemProps extends Experience {
  isLeft?: boolean;
  onEdit?: () => void; // وظيفة لفتح نموذج التعديل
  onDelete?: () => void; // وظيفة الحذف
}

export function TimelineItem({
  title,
  company = "",
  description = "",
  from = "",
  to = null,
  isLeft = false,
  onEdit, // تم الإضافة
  onDelete, // تم الإضافة
}: TimelineItemProps) {
  const yearString = `${from} - ${to === null ? "Current" : to}`;
  const showActions = !!onEdit && !!onDelete; // لتحديد ما إذا كنا في وضع الإدارة

  return (
    <div
      className={`flex items-center gap-8 mb-12 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      } max-md:flex-col max-md:items-start`}
    >
      {/* Content */}
      <div
        className={`flex-1 ${
          isLeft ? "text-right" : "text-left"
        } max-md:text-left`}
      >
        <GlassCard>
          {showActions && (
            <div
              className={`flex gap-2 mb-2 ${
                isLeft ? "justify-start" : "justify-end"
              }`}
            >
              <button
                onClick={onEdit}
                className="p-1 rounded border border-(--accent-cyan) hover:bg-[rgba(43,243,248,0.1)] transition-colors duration-200"
              >
                <Edit2 className="w-4 h-4 text-(--accent-cyan)" />
              </button>
              <button
                onClick={onDelete}
                className="p-1 rounded border border-red-500 hover:bg-[rgba(239,68,68,0.1)] transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          )}

          <div className="cyber-caption text-(--accent-cyan) mb-2 uppercase tracking-wider">
            {yearString}
          </div>
          <h4 className="cyber-h2 text-white mb-1" style={{ fontSize: "20px" }}>
            {title}
          </h4>
          <div
            className="cyber-body text-(--accent-magenta) mb-3"
            style={{ fontSize: "16px" }}
          >
            {company}
          </div>
          <p className="cyber-body text-gray-300" style={{ fontSize: "14px" }}>
            {description}
          </p>
        </GlassCard>
      </div>

      {/* Timeline Marker (بقي كما هو) */}
      <div className="relative shrink-0">
        <div
          className={`w-6 h-6 rounded-full border-4 border-(--bg-primary) ${
            isLeft
              ? "bg-(--accent-cyan) shadow-[0_0_20px_rgba(43,243,248,0.8)]"
              : "bg-(--accent-red) shadow-[0_0_20px_rgba(173,43,46,0.8)]"
          }`}
        ></div>
      </div>

      {/* Spacer for alignment (بقي كما هو) */}
      <div className="flex-1 max-md:hidden"></div>
    </div>
  );
}