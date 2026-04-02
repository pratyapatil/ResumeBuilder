import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Github } from 'lucide-react';

export default function TemplateSeven({ data }) {
  const { personalInfo, experience, education, skills, projects, languages, customSections, layout } = data;

  const isVisible = (id) => {
    if (!layout) return true;
    const item = layout.find(item => item.id === id);
    return item ? item.visible : true;
  };

  const renderBulletPoints = (text) => {
    if (!text) return null;
    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
    // If text already has bullets, clean them up for custom rendering
    return lines.map((line, idx) => {
      const cleanLine = line.replace(/^[•\-\*]/, '').trim();
      return (
        <li key={idx} className="flex items-start text-sm text-gray-700 leading-relaxed mb-1.5 break-inside-avoid">
          <span className="text-sky-500 mr-2 mt-1 shrink-0">•</span>
          <span>{cleanLine}</span>
        </li>
      );
    });
  };

  return (
    <div className="bg-white text-gray-800 font-sans h-full flex flex-col pt-12">
      
      {/* Header - Full Width */}
      <header className="px-12 mb-8">
        <h1 className="text-[3rem] font-bold text-gray-900 uppercase tracking-tight leading-none mb-2">
          {personalInfo.firstName} <span className="text-gray-900">{personalInfo.lastName}</span>
        </h1>
        <h2 className="text-xl font-bold text-sky-500 uppercase tracking-wide mb-6">
          {personalInfo.title}
        </h2>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 font-medium">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-sky-500" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-sky-500" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.address && (
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-sky-500" />
              <span>{personalInfo.address}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin size={16} className="text-sky-500" />
              <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-2">
              <Github size={16} className="text-sky-500" />
              <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}
        </div>
      </header>

      {/* Dynamic Masonry Flow Grid - Solves Two-Column Blank Spaces */}
      <div className="block columns-1 md:columns-2 gap-10 flex-1 px-12 py-10 w-full overflow-hidden">
        
        {(!layout || layout.length === 0) ? <div /> : layout.map(section => {
          if (!section.visible) return null;

          if (section.id === 'summary' && personalInfo.summary) {
            return (
              <section key="summary" className="break-inside-avoid mb-8">
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-2 flex flex-col">
                  Summary
                  <span className="w-full h-px bg-gray-200 mt-1 block"></span>
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed pt-1">
                  {personalInfo.summary}
                </p>
              </section>
            );
          }

          if (section.id === 'experience' && experience?.length > 0) {
            return (
              <section key="experience" className="break-inside-avoid mb-8">
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 flex flex-col">
                  Experience
                  <span className="w-full h-px bg-gray-200 mt-1 block"></span>
                </h3>
                <div className="space-y-6">
                  {experience.map(exp => (
                    <div key={exp.id} className="break-inside-avoid">
                      <h4 className="font-bold text-gray-900 text-[1.05rem]">{exp.position}</h4>
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-gray-600 font-medium text-sm">{exp.company}</span>
                        <span className="text-gray-400 text-xs font-semibold whitespace-nowrap">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <ul className="pl-1">
                        {renderBulletPoints(exp.description)}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'education' && education?.length > 0) {
            return (
              <section key="education" className="break-inside-avoid mb-8">
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 flex flex-col">
                  Education
                  <span className="w-full h-px bg-gray-200 mt-1 block"></span>
                </h3>
                <div className="space-y-4">
                  {education.map(edu => (
                    <div key={edu.id} className="break-inside-avoid flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-900 text-[1.05rem] leading-tight">{edu.degree}</h4>
                        <div className="text-gray-600 text-sm mt-1">{edu.institution}</div>
                        {edu.description && <div className="text-gray-500 text-xs mt-1">{edu.description}</div>}
                      </div>
                      {edu.endDate && (
                        <span className="text-gray-400 text-xs font-semibold shrink-0 ml-4">
                          {edu.startDate ? `${edu.startDate} – ` : ''}{edu.endDate}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'projects' && projects?.length > 0) {
            return (
              <section key="projects" className="break-inside-avoid mb-8">
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 flex flex-col">
                  Projects
                  <span className="w-full h-px bg-gray-200 mt-1 block"></span>
                </h3>
                <div className="space-y-5">
                  {projects.map(proj => (
                    <div key={proj.id} className="break-inside-avoid">
                      <h4 className="font-bold text-gray-900 text-md leading-tight">{proj.title}</h4>
                      {proj.link && proj.link !== 'In Development' && (
                        <a href={`https://${proj.link}`} className="text-sky-500 text-xs mt-0.5 block hover:underline">
                          {proj.link}
                        </a>
                      )}
                      {proj.link === 'In Development' && (
                        <span className="text-amber-600 font-semibold text-xs mt-0.5 block">In Development</span>
                      )}
                      <ul className="mt-2 pl-1">
                        {renderBulletPoints(proj.description)}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'skills' && skills?.length > 0) {
            return (
              <section key="skills" className="break-inside-avoid mb-8">
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 flex flex-col">
                  Skills
                  <span className="w-full h-px bg-gray-200 mt-1 block"></span>
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {skills.map((skill, index) => (
                    <span key={index} className="bg-gray-100/80 border border-gray-200 text-gray-800 px-3 py-1.5 rounded text-[0.8rem] font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'languages' && languages?.length > 0) {
            return (
              <section key="languages" className="break-inside-avoid mb-8">
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 flex flex-col">
                  Languages
                  <span className="w-full h-px bg-gray-200 mt-1 block"></span>
                </h3>
                <div className="flex flex-col gap-2 pt-1">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center text-sm font-semibold text-gray-800 pb-1 border-b border-gray-100 last:border-b-0">
                      {lang}
                    </div>
                  ))}
                </div>
              </section>
            );
          }
          
          if (section.id === 'custom' && customSections?.length > 0) {
            return customSections.map((customSection, sIdx) => {
              if (!customSection.title || !customSection.items || customSection.items.length === 0) return null;
              return (
                <section key={`custom_${customSection.id || sIdx}`} className="break-inside-avoid mb-8">
                  <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-4 flex flex-col">
                    {customSection.title}
                    <span className="w-full h-px bg-gray-200 mt-1 block"></span>
                  </h3>
                  <div className="space-y-5">
                    {customSection.items.map((item, iIdx) => (
                      <div key={item.id || iIdx} className="break-inside-avoid">
                        {item.header && <h4 className="font-bold text-gray-900 text-md leading-tight">{item.header}</h4>}
                        {item.subHeader && <div className="text-sky-600 font-medium text-sm mt-0.5">{item.subHeader}</div>}
                        {item.date && <div className="text-gray-400 font-bold text-[0.7rem] mb-1">{item.date}</div>}
                        {item.description && (
                          <div className="text-[0.85rem] text-gray-700 leading-relaxed">
                            {item.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )
            });
          }

          return null;
        })}
      </div>
    </div>
  );
}
