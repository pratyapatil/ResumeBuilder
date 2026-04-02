import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Github, User, Briefcase, GraduationCap, Rocket, Flag, BookOpen, AlertCircle } from 'lucide-react';

export default function TemplateNine({ data }) {
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
        <li key={idx} className="flex items-start text-[0.8rem] text-slate-700 leading-relaxed mb-1 break-inside-avoid">
          <span className="text-slate-600 mr-2 mt-1.5 shrink-0 text-[0.4rem]">●</span>
          <span>{cleanLine}</span>
        </li>
      );
    });
  };

  const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 mb-3">
      <div className="bg-[#bce4d0] p-1.5 rounded-sm">
        <Icon size={16} className="text-[#104d3e]" />
      </div>
      <h3 className="text-[1rem] font-bold text-[#104d3e] uppercase tracking-wide">
        {title}
      </h3>
    </div>
  );

  return (
    <div className="bg-white text-slate-800 font-sans min-h-full flex flex-col w-full">
      <header className="w-full flex justify-between items-center p-12 pb-6 border-b border-slate-100">
        <div className="flex-1 pr-6">
          <h1 className="text-[3rem] font-light text-slate-800 leading-tight mb-3 tracking-tight">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div className="inline-block bg-[#bce4d0] px-4 py-1.5 rounded-full mb-4">
            <h2 className="text-[1.1rem] font-semibold text-[#104d3e] tracking-wide">
              {personalInfo.title}
            </h2>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[0.8rem] text-slate-600 font-medium">
            {personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone size={14} className="text-[#3b8a6a] shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <span className="text-[#3b8a6a] font-bold shrink-0 text-sm">@</span>
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1.5">
                <Linkedin size={14} className="text-[#3b8a6a] shrink-0" />
                <span className="truncate">{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-1.5">
                <Github size={14} className="text-[#3b8a6a] shrink-0" />
                <span className="truncate">{personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[#3b8a6a] shrink-0" />
                <span>{personalInfo.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Photo with blob background simulation */}
        <div className="relative w-40 h-40 shrink-0">
          <div className="absolute inset-0 bg-[#bce4d0] rounded-full scale-[1.15] translate-y-1 translate-x-1 opacity-80 mix-blend-multiply origin-center overflow-hidden" style={{borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%'}}></div>
          <div className="absolute inset-0 bg-[#83c5a6] rounded-full scale-[1.05] -translate-y-2 translate-x-2 opacity-50 mix-blend-multiply origin-center overflow-hidden" style={{borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'}}></div>
          {personalInfo.photo ? (
            <img 
              src={personalInfo.photo} 
              alt="Profile" 
              className="w-40 h-40 rounded-full object-cover relative z-10 border-4 border-white shadow-sm"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-slate-200 relative z-10 border-4 border-white shadow-sm flex items-center justify-center text-slate-400 text-sm">
              No Photo
            </div>
          )}
        </div>
      </header>

      {/* Dynamic Masonry grid mapping to unify columns and pack tightly */}
      <div className="block columns-1 md:columns-2 gap-10 flex-1 px-12 pt-8 pb-12 w-full">
        {(!layout || layout.length === 0) ? <div /> : layout.map(section => {
          if (!section.visible) return null;

          if (section.id === 'summary' && personalInfo.summary) {
            return (
              <section key="summary" className="break-inside-avoid mb-8">
                <SectionHeader icon={User} title="Summary" />
                <p className="text-[0.8rem] text-slate-700 leading-relaxed ml-1">
                  {personalInfo.summary}
                </p>
              </section>
            );
          }

          if (section.id === 'experience' && experience?.length > 0) {
            return (
              <section key="experience" className="break-inside-avoid mb-8">
                <SectionHeader icon={Briefcase} title="Experience" />
                <div className="space-y-6">
                  {experience.map(exp => (
                    <div key={exp.id} className="break-inside-avoid">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className="font-bold text-slate-800 text-[1.1rem]">{exp.company}</h4>
                        <span className="text-slate-500 text-[0.8rem] font-medium">{exp.address || ''}</span>
                      </div>
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-slate-600 font-medium text-[0.95rem]">{exp.position}</span>
                        <span className="text-slate-500 text-[0.8rem] font-medium">{exp.startDate} {exp.endDate ? `– ${exp.endDate}` : ''}</span>
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
                <SectionHeader icon={GraduationCap} title="Education" />
                <div className="space-y-5">
                  {education.map(edu => (
                    <div key={edu.id} className="break-inside-avoid">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className="font-bold text-slate-800 text-[1.05rem]">{edu.institution}</h4>
                      </div>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-slate-600 text-[0.9rem]">{edu.degree}</span>
                        <span className="text-slate-500 text-[0.8rem] font-medium">{edu.startDate} {edu.endDate ? `– ${edu.endDate}` : ''}</span>
                      </div>
                      {edu.description && <p className="text-[0.8rem] text-slate-700 mt-1">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'projects' && projects?.length > 0) {
            return (
              <section key="projects" className="break-inside-avoid mb-8">
                <SectionHeader icon={Flag} title="Key Achievements" />
                <div className="space-y-5 ml-1">
                  {projects.map(proj => (
                    <div key={proj.id} className="break-inside-avoid relative pl-4 border-l-2 border-slate-200">
                      <div className="absolute w-2.5 h-2.5 bg-[#408b6f] rounded-full -left-[5.5px] top-1"></div>
                      <h4 className="font-bold text-[0.95rem] text-slate-800 leading-tight mb-1">{proj.title}</h4>
                      {proj.link && proj.link !== 'In Development' && (
                        <a href={`https://${proj.link}`} className="text-[#3b8a6a] text-[0.75rem] mb-1.5 block hover:underline">
                          {proj.link}
                        </a>
                      )}
                      <div className="text-[0.8rem] text-slate-600 leading-relaxed">
                        {typeof proj.description === 'string' ? proj.description.replace(/^[•\-\*]/gm, '').trim() : proj.description}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'skills' && skills?.length > 0) {
            return (
              <section key="skills" className="break-inside-avoid mb-8">
                <SectionHeader icon={Rocket} title="Skills" />
                <div className="text-[0.85rem] text-slate-700 leading-relaxed font-semibold">
                  {skills.join(' · ')}
                </div>
              </section>
            );
          }

          if (section.id === 'languages' && languages?.length > 0) {
            return (
              <section key="languages" className="break-inside-avoid mb-8">
                <SectionHeader icon={BookOpen} title="Languages" />
                <div className="space-y-3 ml-1">
                  {languages.map((lang, index) => (
                    <div key={index} className="break-inside-avoid flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#408b6f] rounded-full"></div>
                      <h4 className="font-bold text-[0.9rem] text-slate-800 leading-tight">{lang}</h4>
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
                  <SectionHeader icon={AlertCircle} title={customSection.title} />
                  <div className="space-y-5 ml-1 pt-1">
                    {customSection.items.map((item, iIdx) => (
                      <div key={item.id || iIdx} className="break-inside-avoid relative pl-4 border-l-2 border-slate-200">
                        <div className="absolute w-2.5 h-2.5 bg-[#408b6f] rounded-full -left-[5.5px] top-1"></div>
                        <div className="flex justify-between items-baseline mb-0.5">
                          {item.header && <h4 className="font-bold text-slate-800 text-[0.95rem]">{item.header}</h4>}
                          {item.date && <span className="text-slate-500 text-[0.8rem] font-medium shrink-0 ml-4">{item.date}</span>}
                        </div>
                        {item.subHeader && <div className="text-slate-600 font-medium text-[0.9rem] mb-1">{item.subHeader}</div>}
                        {item.description && (
                          <div className="text-[0.8rem] text-slate-700 leading-relaxed mt-1">
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
