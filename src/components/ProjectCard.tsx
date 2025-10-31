import React, { useState } from 'react';
import { ExternalLink, Code, Info } from 'lucide-react';
import { CyberButton } from './CyberButton';
import { TechLogo } from './TechLogo';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Project } from '../store/types';


// تعريف تايب الخصائص للمكون ProjectCard
// يستخدم تايب Project الأساسي مع إضافة حقل fullDescription الذي تستخدمه داخلياً
interface ProjectCardProps extends Project {
  // حقل إضافي غير موجود في التايب الأساسي Project ولكنه مستخدم في الكارد
  fullDescription?: string; 
}


export function ProjectCard({ 
  title, 
  description = '', // تم إعطاؤه قيمة افتراضية لتفادي الخطأ إذا كان description اختياري في التايب
  fullDescription,
  tech = [], // استخدام tech بدلاً من technologies وإعطاؤها قيمة افتراضية
  image, // استخدام image بدلاً من imageUrl
  liveUrl = '#',
  codeUrl = '#'
}: ProjectCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // يتم استخدام description بدلاً من imageUrl
  const imageUrl = image; 
  // يتم استخدام tech بدلاً من technologies
  const technologies = tech; 

  const truncatedDescription = description.length > 100 
    ? description.substring(0, 100) + '...' 
    : description;
  const hasMoreContent = description.length > 100 || fullDescription;

  // تأكد من وجود image قبل العرض
  if (!imageUrl) return null; 

  return (
    <div className="h-full flex flex-col backdrop-blur-md bg-[rgba(0,31,63,0.3)] border-2 border-[var(--accent-cyan)] shadow-[0_0_25px_rgba(43,243,248,0.3),inset_0_0_20px_rgba(43,243,248,0.05)] rounded-lg overflow-hidden hover:shadow-[0_0_35px_rgba(43,243,248,0.5),inset_0_0_30px_rgba(43,243,248,0.1)] transition-all duration-500 group">
      {/* Project Image */}
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Project Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="cyber-h2 text-[var(--accent-cyan)] flex-1" style={{ fontSize: '24px' }}>
            {title}
          </h3>
          {hasMoreContent && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <button 
                  className="p-2 border border-[var(--accent-cyan)] text-[var(--accent-cyan)] rounded-md hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all duration-300 shadow-[0_0_10px_rgba(43,243,248,0.3)]"
                  title="View full details"
                >
                  <Info className="w-4 h-4" />
                </button>
              </DialogTrigger>
              <DialogContent className="backdrop-blur-xl bg-[rgba(0,4,19,0.95)] border-2 border-[var(--accent-cyan)] shadow-[0_0_40px_rgba(43,243,248,0.4)] max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="cyber-h2 text-[var(--accent-cyan)]" style={{ fontSize: '32px' }}>
                    {title}
                  </DialogTitle>
                  <DialogDescription className="cyber-body text-gray-300 mt-4">
                    {fullDescription || description}
                  </DialogDescription>
                </DialogHeader>
                
                {/* Tech Logos in Modal */}
                <div className="mt-6">
                  <h4 className="cyber-caption text-[var(--accent-cyan)] mb-4 uppercase tracking-wider">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-6 justify-center">
                    {technologies.map((techItem, index) => (
                      <TechLogo key={index} name={techItem} />
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  {liveUrl !== '#' && (
                    <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <CyberButton variant="primary" className="w-full">
                        <ExternalLink className="inline-block w-4 h-4 mr-1" />
                        View Live
                      </CyberButton>
                    </a>
                  )}
                  {codeUrl !== '#' && (
                    <a href={codeUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <CyberButton variant="outline" className="w-full">
                        <Code className="inline-block w-4 h-4 mr-1" />
                        View Code
                      </CyberButton>
                    </a>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
        
        <p className="cyber-body text-gray-300 mb-4 flex-grow" style={{ fontSize: '16px' }}>
          {truncatedDescription}
        </p>

        {/* Tech Stack - Show first 3 as logos */}
        <div className="flex flex-wrap gap-4 mb-4 justify-center py-2">
          {technologies.slice(0, 3).map((techItem, index) => (
            <TechLogo key={index} name={techItem} />
          ))}
          {technologies.length > 3 && (
            <div className="flex items-center">
              <span className="cyber-caption text-[var(--accent-cyan)] text-xs">
                +{technologies.length - 3} more
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          {liveUrl !== '#' && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <CyberButton variant="primary" className="w-full text-xs py-2">
                <ExternalLink className="inline-block w-4 h-4 mr-1" />
                Live
              </CyberButton>
            </a>
          )}
          {codeUrl !== '#' && (
            <a href={codeUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <CyberButton variant="outline" className="w-full text-xs py-2">
                <Code className="inline-block w-4 h-4 mr-1" />
                Code
              </CyberButton>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}