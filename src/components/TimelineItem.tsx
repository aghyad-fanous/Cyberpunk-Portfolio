import { Experience } from "../store/types"
import { GlassCard } from "./GlassCard"

// 1. تعريف تايب Experience أو استيراده (إذا كان في ملف خارجي)
// **يفضل استيراد هذا التايب من ملف الـ slice أو types الأصلي في مشروعك**
export type Language = "en" | "ar" // افتراض تايب اللغة

// تعريف تايب الخصائص للمكون TimelineItem
// يدمج تايب Experience مع خاصية isLeft المطلوبة للتصميم
interface TimelineItemProps extends Experience {
  isLeft?: boolean
}

export function TimelineItem({
  // استخدام الخصائص من تايب Experience، مع قيم افتراضية للحقول الاختيارية
  title,
  company = "",
  description = "",
  from = "",
  to = null, // يُفترض أن 'to' يمكن أن تكون null للخبرة الحالية
  isLeft = false,
}: TimelineItemProps) {
  // دمج حقلي from و to لإنشاء سلسلة 'year' المستخدمة في التصميم
  const yearString = `${from} - ${to === null ? "Current" : to}`

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
          <div className="cyber-caption text-(--accent-cyan) mb-2 uppercase tracking-wider">
            {/* استخدام yearString المدمج */}
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

      {/* Timeline Marker */}
      <div className="relative shrink-0">
        <div
          className={`w-6 h-6 rounded-full border-4 border-(--bg-primary) ${
            isLeft
              ? "bg-(--accent-cyan) shadow-[0_0_20px_rgba(43,243,248,0.8)]"
              : "bg-(--accent-red) shadow-[0_0_20px_rgba(173,43,46,0.8)]"
          }`}
        ></div>
      </div>

      {/* Spacer for alignment */}
      <div className="flex-1 max-md:hidden"></div>
    </div>
  )
}
