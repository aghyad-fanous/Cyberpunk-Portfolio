import React, { useState } from 'react';
import { ExternalLink, Code, Info, Edit2, Trash2 } from 'lucide-react';
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


interface ProjectCardProps extends Project {
  fullDescription?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}


export function ProjectCard({ 
  title, 
  description = '',
  fullDescription,
  tags = [],
  image,
  liveUrl = '#',
  codeUrl = '#',
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const imageUrl = image; 
  const technologies = tags; 

  const truncatedDescription = description.length > 100 
    ? description.substring(0, 100) + '...' 
    : description;
  const hasMoreContent = description.length > 100 || fullDescription;
  
  const showActions = !!onEdit && !!onDelete;

  if (!imageUrl) return null; 

  return (
    <div className="h-full flex flex-col backdrop-blur-md bg-[rgba(0,31,63,0.3)] border-2 border-(--accent-cyan) shadow-[0_0_25px_rgba(43,243,248,0.3),inset_0_0_20px_rgba(43,243,248,0.05)] rounded-lg overflow-hidden hover:shadow-[0_0_35px_rgba(43,243,248,0.5),inset_0_0_30px_rgba(43,243,248,0.1)] transition-all duration-500 group">
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-(--bg-primary) via-transparent to-transparent opacity-60"></div>
      </div>

      <div className="p-6 flex flex-col grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="cyber-h2 text-(--accent-cyan) flex-1" style={{ fontSize: '24px' }}>
            {title}
          </h3>
          
          {showActions && (
             <div className="flex flex-col gap-2 ml-4">
               <button onClick={onEdit} className="p-2 rounded border border-(--accent-cyan) hover:bg-[rgba(43,243,248,0.1)] transition-colors duration-200">
                 <Edit2 className="w-4 h-4 text-(--accent-cyan)" />
               </button>
               <button onClick={onDelete} className="p-2 rounded border border-red-500 hover:bg-[rgba(239,68,68,0.1)] transition-colors duration-200">
                 <Trash2 className="w-4 h-4 text-red-400" />
               </button>
             </div>
          )}

          {(hasMoreContent && !showActions) && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <button 
                  className="p-2 border border-(--accent-cyan) text-(--accent-cyan) rounded-md hover:bg-(--accent-cyan) hover:text-(--bg-primary) transition-all duration-300 shadow-[0_0_10px_rgba(43,243,248,0.3)]"
                  title="View full details"
                >
                  <Info className="w-4 h-4" />
                </button>
              </DialogTrigger>
              <DialogContent className="backdrop-blur-xl bg-[rgba(0,4,19,0.95)] border-2 border-(--accent-cyan) shadow-[0_0_40px_rgba(43,243,248,0.4)] max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="cyber-h2 text-(--accent-cyan)" style={{ fontSize: '32px' }}>
                    {title}
                  </DialogTitle>
                  <DialogDescription className="cyber-body text-gray-300 mt-4">
                    {fullDescription || description}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="mt-6">
                  <h4 className="cyber-caption text-(--accent-cyan) mb-4 uppercase tracking-wider">
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
        
        <p className="cyber-body text-gray-300 mb-4 grow" style={{ fontSize: '16px' }}>
          {truncatedDescription}
        </p>

        <div className="flex flex-wrap gap-4 mb-4 justify-center py-2">
          {technologies.slice(0, 3).map((techItem, index) => (
            <TechLogo key={index} name={techItem} />
          ))}
          {technologies.length > 3 && (
            <div className="flex items-center">
              <span className="cyber-caption text-(--accent-cyan) text-xs">
                +{technologies.length - 3} more
              </span>
            </div>
          )}
        </div>

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