import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Github, Globe, Calendar, Lightbulb, Flag, Zap, Sparkles, Award, Star } from 'lucide-react';

export default function TemplateTwelve({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages, customSections, layout } = data;

  const isVisible = (id) => {
    if (!layout) return true;
    const item = layout.find(item => item.id === id);
    return item ? item.visible : true;
  };

  const renderBulletPoints = (text) => {
    if (!text) return null;
    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
    return lines.map((line, idx) => {
      const cleanLine = line.replace(/^[•\-\*]/, '').trim();
      return (
        <li key={idx} className="flex items-start text-[0.8rem] text-slate-700 leading-relaxed mb-1.5 break-inside-avoid">
          <span className="text-gray-400 mr-2 mt-1.5 shrink-0 text-[0.25rem]">■</span>
          <span>{cleanLine}</span>
        </li>
      );
    });
  };

  const SectionHeader = ({ title }) => (
    <div className="mb-4">
      <h3 className="text-[1.05rem] font-bold text-[#1f3d5c] uppercase tracking-wide mb-1.5">
        {title}
      </h3>
      <div className="w-full h-0.5 bg-[#1f3d5c]"></div>
    </div>
  );

  return (
    <div className="bg-white text-gray-800 font-sans h-full flex flex-col w-full">
      {/* Header */}
      <header className="bg-[#1f3d5c] text-white px-12 py-10 flex justify-between items-center">
        <div className="flex-1 pr-6">
          <h1 className="text-[2.5rem] font-bold uppercase tracking-wider mb-1 leading-none text-white">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <h2 className="text-[1.1rem] font-medium text-white/90 mb-4 tracking-wide font-sans">
            {personalInfo.title}
          </h2>

          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[0.8rem] text-white/80 font-medium">
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-white shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-center gap-2 text-white">
                <span className="text-white font-bold shrink-0">@</span>
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin size={14} className="text-white shrink-0" />
                <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-white shrink-0" />
                <span>{personalInfo.address}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-2">
                <Github size={14} className="text-white shrink-0" />
                <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}
            {personalInfo.portfolio && (
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-white shrink-0" />
                <span>{personalInfo.portfolio.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Photo */}
        {personalInfo.photo && (
          <div className="w-32 h-32 shrink-0 rounded-full overflow-hidden border border-[#2d5a88] shadow-lg">
            <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      {/* Dynamic Masonry Flow Grid - Solves Two-Column Blank Spaces */}
      <div className="block columns-1 md:columns-2 gap-10 flex-1 px-12 py-10 w-full">
        
        {(!layout || layout.length === 0) ? <div /> : layout.map(section => {
          if (!section.visible) return null;

          if (section.id === 'summary' && personalInfo.summary) {
            return (
              <section key="summary" className="break-inside-avoid mb-8">
                <SectionHeader title="Summary" />
                <p className="text-[0.85rem] text-gray-700 leading-relaxed">
                  {personalInfo.summary}
                </p>
              </section>
            );
          }

          if (section.id === 'experience' && experience?.length > 0) {
            return (
              <section key="experience" className="break-inside-avoid mb-8">
                <SectionHeader title="Experience" />
                <div className="space-y-0">
                  {experience.map((exp, idx) => (
                    <div key={exp.id} className={`break-inside-avoid py-4 ${idx !== 0 ? 'border-t border-dashed border-gray-300' : 'pt-0'}`}>
                      <h4 className="font-medium text-[#1f3d5c] text-[1.1rem] mb-0.5">{exp.position}</h4>
                      <div className="text-[#1f3d5c] font-bold text-[0.95rem] mb-2">{exp.company}</div>
                      
                      <div className="flex items-center gap-3 text-gray-500 text-[0.75rem] font-medium mb-3">
                        {(exp.startDate || exp.endDate) && (
                          <div className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            <span>{exp.startDate} {exp.endDate ? `– ${exp.endDate}` : ''}</span>
                          </div>
                        )}
                        {exp.address && (
                          <div className="flex items-center gap-1.5">
                            <MapPin size={12} />
                            <span>{exp.address}</span>
                          </div>
                        )}
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
                <SectionHeader title="Education" />
                <div className="space-y-0">
                  {education.map((edu, idx) => (
                    <div key={edu.id} className={`break-inside-avoid py-4 ${idx !== 0 ? 'border-t border-dashed border-gray-300' : 'pt-0'}`}>
                      <h4 className="font-medium text-[#1f3d5c] text-[1.05rem] mb-0.5">{edu.degree}</h4>
                      <div className="text-[#1f3d5c] font-bold text-[0.95rem] mb-2">{edu.institution}</div>
                      
                      <div className="flex items-center gap-3 text-gray-500 text-[0.75rem] font-medium mb-1">
                        {(edu.startDate || edu.endDate) && (
                          <div className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            <span>{edu.startDate} {edu.endDate ? `– ${edu.endDate}` : ''}</span>
                          </div>
                        )}
                        {edu.address && (
                          <div className="flex items-center gap-1.5">
                            <MapPin size={12} />
                            <span>{edu.address}</span>
                          </div>
                        )}
                      </div>

                      {edu.description && <p className="text-[0.85rem] text-gray-700 leading-relaxed mt-2">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'projects' && projects?.length > 0) {
            return (
              <section key="projects" className="break-inside-avoid mb-8">
                <SectionHeader title="Achievements & Projects" />
                <div className="space-y-0">
                  {projects.map((proj, idx) => {
                    const icons = [Lightbulb, Flag, Sparkles, Zap, Award];
                    const ProjIcon = icons[idx % icons.length];
                    return (
                      <div key={proj.id} className={`break-inside-avoid py-4 flex gap-4 ${idx !== 0 ? 'border-t border-dashed border-gray-300' : 'pt-0'}`}>
                        <div className="mt-0.5 shrink-0">
                          <ProjIcon size={18} className="text-[#1f3d5c]" strokeWidth={2.5} />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#1f3d5c] text-[0.95rem] mb-1 leading-tight">{proj.title}</h4>
                          {proj.link && proj.link !== 'In Development' && (
                            <a href={`https://${proj.link}`} className="text-gray-500 text-[0.75rem] mb-1.5 block hover:underline">
                              {proj.link}
                            </a>
                          )}
                          <div className="text-[0.8rem] text-gray-700 leading-relaxed">
                            {typeof proj.description === 'string' ? proj.description.replace(/^[•\-\*]/gm, '').trim() : proj.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          }

          if (section.id === 'skills' && skills?.length > 0) {
            return (
              <section key="skills" className="break-inside-avoid mb-8">
                <SectionHeader title="Skills" />
                <div className="flex flex-wrap gap-x-4 gap-y-3 pt-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="text-[#1f3d5c] text-[0.85rem] font-bold border-b-2 border-gray-200 pb-0.5">
                      {skill}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'certifications' && certifications?.length > 0) {
            return (
              <section key="certifications" className="break-inside-avoid mb-8">
                <SectionHeader title="Courses / Certifications" />
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {certifications.map(cert => (
                    <div key={cert.id} className="break-inside-avoid">
                      <h4 className="font-bold text-[#1f3d5c] text-[0.85rem] leading-snug mb-1">{cert.name}</h4>
                      <div className="text-[0.75rem] font-semibold text-gray-600">{cert.issuer}</div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'languages' && languages?.length > 0) {
            return (
              <section key="languages" className="break-inside-avoid mb-8">
                <SectionHeader title="Languages" />
                <div className="flex flex-wrap gap-x-8 gap-y-2 pt-1">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex items-center gap-2 text-[0.85rem] font-bold text-[#1f3d5c]">
                      <Globe size={12} className="text-gray-400" />
                      <span>{lang}</span>
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
                  <SectionHeader title={customSection.title} />
                  <div className="space-y-4 pt-2">
                    {customSection.items.map((item, iIdx) => {
                      const icons = [Star, Flag, Lightbulb, Zap];
                      const ItemIcon = icons[iIdx % icons.length];
                      return (
                        <div key={item.id || iIdx} className={`break-inside-avoid flex gap-4`}>
                          <div className="mt-0.5 shrink-0">
                            <ItemIcon size={18} className="text-[#1f3d5c]" strokeWidth={2.5} />
                          </div>
                          <div>
                            {item.header && <h4 className="font-bold text-[#1f3d5c] text-[0.95rem] mb-0.5 leading-tight">{item.header}</h4>}
                            {item.subHeader && <div className="text-gray-600 font-medium text-[0.8rem] mb-1">{item.subHeader}</div>}
                            {item.date && <div className="text-gray-400 text-[0.75rem] mb-1">{item.date}</div>}
                            {item.description && (
                              <div className="text-[0.8rem] text-gray-700 leading-relaxed">
                                {item.description}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
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
