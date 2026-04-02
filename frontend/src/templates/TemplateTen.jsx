import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Github, Calendar, CheckSquare, Flag, TrendingUp, Award, Check } from 'lucide-react';

export default function TemplateTen({ data }) {
  const { personalInfo, experience, education, skills, projects, languages, customSections, layout } = data;

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
        <li key={idx} className="flex items-start text-[0.85rem] text-gray-700 leading-relaxed mb-1.5 break-inside-avoid">
          <span className="text-gray-400 mr-2 mt-1.5 shrink-0 text-[0.25rem]">■</span>
          <span>{cleanLine}</span>
        </li>
      );
    });
  };

  const SectionHeader = ({ title }) => (
    <div className="mb-4">
      <h3 className="text-[0.8rem] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
        {title}
      </h3>
      <div className="w-full h-px bg-gray-300"></div>
    </div>
  );

  return (
    <div className="bg-white text-gray-800 font-sans h-full flex flex-col p-10 px-12 w-full">
      {/* Header */}
      <header className="flex justify-between items-start mb-8">
        <div className="flex-1 pr-6">
          <h1 className="text-[2.5rem] font-bold text-[#1e3a8a] uppercase tracking-wide leading-tight mb-2">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <h2 className="text-[1.1rem] font-medium text-[#ea580c] mb-4">
            {personalInfo.title}
          </h2>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[0.8rem] text-gray-600 font-medium">
            {personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone size={14} className="text-gray-400" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <span className="text-gray-400 font-bold shrink-0">@</span>
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1.5">
                <Linkedin size={14} className="text-gray-400" />
                <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-1.5">
                <Github size={14} className="text-gray-400" />
                <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-gray-400" />
                <span>{personalInfo.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Photo */}
        {personalInfo.photo && (
          <div className="w-32 h-32 shrink-0 rounded-full overflow-hidden border border-gray-200">
            <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      {/* Dynamic Masonry Flow Grid - Solves Two-Column Blank Spaces */}
      <div className="block columns-1 md:columns-2 gap-10 flex-1 w-full pb-10">
        
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
                <div className="space-y-6">
                  {experience.map(exp => (
                    <div key={exp.id} className="break-inside-avoid">
                      <h4 className="font-semibold text-[#1e3a8a] text-[1.05rem] mb-0.5">{exp.position}</h4>
                      <div className="flex justify-between items-baseline mb-3">
                        <span className="text-[#ea580c] text-[0.9rem] font-medium">{exp.company}</span>
                        <div className="flex items-center gap-3 text-gray-500 text-[0.75rem] font-medium">
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
                <div className="space-y-6">
                  {education.map(edu => (
                    <div key={edu.id} className="break-inside-avoid">
                      <h4 className="font-semibold text-[#1e3a8a] text-[1.05rem] mb-0.5">{edu.degree}</h4>
                      <div className="text-[#ea580c] text-[0.9rem] font-medium mb-2">{edu.institution}</div>
                      
                      <div className="flex items-center gap-4 text-gray-500 text-[0.75rem] font-medium mb-1">
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

                      {edu.description && <p className="text-[0.85rem] text-gray-700 leading-relaxed mt-1">{edu.description}</p>}
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
                <div className="space-y-6">
                  {projects.map((proj, idx) => {
                    const icons = [TrendingUp, Flag, Check, Award];
                    const ProjIcon = icons[idx % icons.length];
                    return (
                      <div key={proj.id} className="break-inside-avoid flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                          <ProjIcon size={14} className="text-[#ea580c]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1e3a8a] text-[0.95rem] mb-1 leading-tight">{proj.title}</h4>
                          {proj.link && proj.link !== 'In Development' && (
                            <a href={`https://${proj.link}`} className="text-gray-500 text-[0.75rem] mb-1.5 block hover:underline">
                              {proj.link}
                            </a>
                          )}
                          <div className="text-[0.85rem] text-gray-700 leading-relaxed">
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
                <div className="flex flex-wrap gap-x-6 gap-y-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="text-[#1e3a8a] text-[0.85rem] font-medium border-b border-gray-300 pb-0.5 min-w-[80px]">
                      {skill}
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
                <div className="flex flex-col gap-3">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-1/3 text-[0.95rem] font-medium text-[#1e3a8a]">{lang}</div>
                      <div className="text-[0.85rem] text-gray-500 min-w-[60px]">{index === 0 ? 'Native' : 'Advanced'}</div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((dot) => (
                          <div key={dot} className={`w-2 h-2 rounded-full ${dot <= (index === 0 ? 5 : 4) ? 'bg-[#1e3a8a]' : 'bg-gray-200'}`}></div>
                        ))}
                      </div>
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
                  <div className="space-y-4 pt-1">
                    {customSection.items.map((item, iIdx) => (
                      <div key={item.id || iIdx} className="break-inside-avoid flex gap-3">
                         <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                          <Check size={14} className="text-[#ea580c]" />
                        </div>
                        <div>
                          {item.header && <h4 className="font-bold text-[#1e3a8a] text-[0.95rem] mb-0.5 leading-tight">{item.header}</h4>}
                          {item.subHeader && <div className="text-gray-600 font-medium text-[0.8rem] mb-1">{item.subHeader}</div>}
                          {item.date && <div className="text-gray-400 text-[0.75rem] font-bold mb-1.5">{item.date}</div>}
                          {item.description && (
                            <div className="text-[0.85rem] font-medium text-gray-700 leading-relaxed">
                              {item.description}
                            </div>
                          )}
                        </div>
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
