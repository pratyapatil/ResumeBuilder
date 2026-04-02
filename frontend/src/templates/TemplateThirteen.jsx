import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Github, Globe, Calendar, Flag, Star, Heart } from 'lucide-react';

export default function TemplateThirteen({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications, customSections, languages, layout } = data;

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
        <li key={idx} className="flex items-start text-[0.85rem] text-slate-700 leading-relaxed mb-1.5 break-inside-avoid">
          <span className="text-gray-500 mr-2 mt-1.5 shrink-0 text-[0.25rem]">●</span>
          <span>{cleanLine}</span>
        </li>
      );
    });
  };

  const SectionHeader = ({ title }) => (
    <div className="mb-4">
      <h3 className="text-[1.1rem] font-bold text-gray-900 uppercase tracking-widest leading-none mb-1.5 font-sans">
        {title}
      </h3>
      <div className="w-full h-0.5 bg-gray-900"></div>
    </div>
  );

  return (
    <div className="bg-white text-gray-800 font-sans h-full flex flex-col w-full p-12 px-14">
      
      {/* Header */}
      <header className="flex justify-between items-start mb-8">
        <div className="flex-1 pr-6 pt-2">
          <h1 className="text-[2.75rem] font-extrabold uppercase tracking-tight leading-none mb-2 text-gray-900">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <h2 className="text-[1.1rem] font-bold text-[#1f6feb] mb-4 tracking-wide">
            {personalInfo.title}
          </h2>

          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[0.8rem] text-gray-800 font-bold">
            {personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone size={14} className="text-[#1f6feb] shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <span className="text-[#1f6feb] font-bold shrink-0">@</span>
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1.5">
                <Linkedin size={14} className="text-[#1f6feb] shrink-0" />
                <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[#1f6feb] shrink-0" />
                <span>{personalInfo.address}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-1.5">
                <Github size={14} className="text-[#1f6feb] shrink-0" />
                <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}
            {personalInfo.portfolio && (
              <div className="flex items-center gap-1.5">
                <Globe size={14} className="text-[#1f6feb] shrink-0" />
                <span>{personalInfo.portfolio.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Photo */}
        {personalInfo.photo && (
          <div className="w-36 h-36 shrink-0 rounded-full overflow-hidden border-2 border-transparent relative">
            <div className="absolute inset-0 bg-gray-200 rounded-full mix-blend-multiply opacity-50 z-0"></div>
            <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover relative z-10" />
          </div>
        )}
      </header>

      {/* Dynamic Masonry Flow Grid - Solves Two-Column Blank Spaces */}
      <div className="block columns-1 md:columns-2 gap-12 flex-1 pb-8 w-full pb-10">
        
        {(!layout || layout.length === 0) ? (
            /* Fallback rendering if layout order is missing */
            <div />
        ) : (
          layout.map(section => {
            if (!section.visible) return null;

            if (section.id === 'summary' && personalInfo.summary) {
              return (
                <section key="summary" className="break-inside-avoid mb-8">
                  <SectionHeader title="Summary" />
                  <p className="text-[0.85rem] text-gray-700 leading-relaxed font-medium pt-1">
                    {personalInfo.summary}
                  </p>
                </section>
              );
            }

            if (section.id === 'experience' && experience?.length > 0) {
              return (
                <section key="experience" className="break-inside-avoid mb-8">
                  <SectionHeader title="Experience" />
                  <div className="space-y-0 pt-1">
                    {experience.map((exp, idx) => (
                      <div key={exp.id} className={`break-inside-avoid py-4 ${idx !== 0 ? 'border-t border-dashed border-gray-300' : 'pt-0'}`}>
                        <h4 className="font-medium text-gray-900 text-[1.2rem] mb-0.5">{exp.position}</h4>
                        <div className="text-[#1f6feb] font-bold text-[0.95rem] mb-2">{exp.company}</div>
                        
                        <div className="flex items-center gap-3 text-gray-500 text-[0.75rem] font-bold mb-3">
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
                  <div className="space-y-0 pt-1">
                    {education.map((edu, idx) => (
                      <div key={edu.id} className={`break-inside-avoid py-4 ${idx !== 0 ? 'border-t border-dashed border-gray-300' : 'pt-0'}`}>
                        <h4 className="font-medium text-gray-900 text-[1.1rem] mb-0.5">{edu.degree}</h4>
                        <div className="text-[#1f6feb] font-bold text-[0.95rem] mb-2">{edu.institution}</div>
                        
                        <div className="flex items-center gap-3 text-gray-500 text-[0.75rem] font-bold mb-1">
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
                  <SectionHeader title="Projects" />
                  <div className="space-y-0 pt-1">
                    {projects.map((proj, idx) => (
                      <div key={proj.id} className={`break-inside-avoid py-4 ${idx !== 0 ? 'border-t border-dashed border-gray-300' : 'pt-0'}`}>
                        <h4 className="font-medium text-gray-900 text-[1.1rem] mb-2 leading-tight">{proj.title}</h4>
                        <div className="text-[0.85rem] text-gray-700 font-medium leading-relaxed mb-1.5">
                          {typeof proj.description === 'string' ? proj.description.replace(/^[•\-\*]/gm, '').trim() : proj.description}
                        </div>
                        {proj.link && proj.link !== 'In Development' && (
                          <div className="text-gray-500 text-[0.75rem] font-mono tracking-tight leading-none break-all">
                            {proj.link.replace(/^https?:\/\/(www\.)?/, '')}
                          </div>
                        )}
                      </div>
                    ))}
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
                      <div key={index} className="text-gray-900 tracking-wide text-[0.85rem] font-bold border-b-2 border-gray-300 pb-0.5">
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
                  <SectionHeader title="Courses" />
                  <div className="space-y-4 pt-2">
                    {certifications.map(cert => (
                      <div key={cert.id} className="break-inside-avoid">
                        <h4 className="font-bold text-[#1f6feb] text-[0.85rem] leading-snug mb-1.5 tracking-wide">{cert.name}</h4>
                        <div className="text-[0.85rem] font-medium text-gray-700 leading-snug">{cert.issuer} {cert.date ? `- ${cert.date}` : ''}</div>
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
                  <div className="space-y-2 pt-2 text-[0.85rem] font-bold text-gray-800 tracking-wide">
                    {languages.map((lang, idx) => (
                      <div key={idx}>{lang}</div>
                    ))}
                  </div>
                </section>
              );
            }

            if (section.id === 'custom' && customSections?.length > 0) {
              return customSections.map((customSection, sIdx) => {
                if (!customSection.title || !customSection.items || customSection.items.length === 0) return null;
                const isAchievements = customSection.title.toLowerCase().includes('achievement');
                return (
                  <section key={`custom_${customSection.id || sIdx}`} className="break-inside-avoid mb-8">
                    <SectionHeader title={customSection.title} />
                    <div className="space-y-0 pt-1">
                      {customSection.items.map((item, iIdx) => {
                        const icons = [Flag, Star, Star, Heart];
                        const ItemIcon = icons[iIdx % icons.length];
                        return (
                          <div key={item.id || iIdx} className={`break-inside-avoid py-4 flex gap-4 ${iIdx !== 0 ? 'border-t border-dashed border-gray-300' : 'pt-0'}`}>
                            {isAchievements ? (
                              <div className="mt-0.5 shrink-0">
                                <ItemIcon size={18} className="text-[#1f6feb] fill-[#1f6feb]" strokeWidth={1} />
                              </div>
                            ) : null}
                            <div>
                              {item.header && <h4 className="font-bold text-gray-900 text-[0.95rem] mb-1.5 leading-tight">{item.header}</h4>}
                              {item.subHeader && <div className="text-gray-600 font-medium text-[0.8rem] mb-1">{item.subHeader}</div>}
                              {item.date && <div className="text-gray-400 text-[0.75rem] font-bold mb-1.5">{item.date}</div>}
                              {item.description && (
                                <div className="text-[0.85rem] font-medium text-gray-700 leading-relaxed">
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
          })
        )}
      </div>
    </div>
  );
}
