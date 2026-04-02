import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Globe, Link as LinkIcon, Briefcase, GraduationCap, FolderOpen, Puzzle, Flag } from 'lucide-react';

export default function TemplateFourteen({ data }) {
  const { personalInfo, experience, education, skills, projects, languages, customSections, layout } = data;

  const getOrder = (id) => {
    if (!layout) return 99;
    const index = layout.findIndex(item => item.id === id);
    return index !== -1 ? index : 99;
  };

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

  const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-3 mb-4 relative z-10 w-full pl-6">
      <div className="absolute left-[-2px] -ml-[25px] w-12 h-12 bg-[#0e5076] text-white flex items-center justify-center transform rotate-45 z-20 shadow-md">
        <Icon size={20} className="transform -rotate-45" strokeWidth={1.5} />
      </div>
      <h3 className="text-[1.3rem] font-bold text-[#0e5076] tracking-wide ml-8">
        {title}
      </h3>
    </div>
  );

  return (
    <div className="bg-white text-gray-800 font-sans h-full flex flex-col w-full relative overflow-hidden">
      
      {/* Header Block */}
      <header className="bg-[#0e5076] text-white p-10 flex justify-between items-center relative z-20">
        <div className="flex-1 pr-6">
          <h1 className="text-[2.8rem] font-medium leading-none mb-1 text-white">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <h2 className="text-[1.1rem] font-light text-white/90 mb-5 tracking-wide uppercase">
            {personalInfo.title}
          </h2>

          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[0.8rem] font-medium font-sans">
            {personalInfo.address && (
              <div className="flex gap-2">
                <span className="font-bold w-14">Address</span>
                <span className="text-white/80">{personalInfo.address}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex gap-2">
                <span className="font-bold w-12">WWW</span>
                <a href={`https://${personalInfo.linkedin}`} className="text-white/80 shrink break-all hover:underline">{personalInfo.linkedin}</a>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex gap-2">
                <span className="font-bold w-14">Phone</span>
                <span className="text-white/80">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.portfolio && (
              <div className="flex gap-2">
                <span className="font-bold w-12">Port</span>
                <a href={`https://${personalInfo.portfolio}`} className="text-white/80 shrink break-all hover:underline">{personalInfo.portfolio}</a>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex gap-2">
                <span className="font-bold w-14">E-mail</span>
                <span className="text-white/80">{personalInfo.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* Header Photo Box */}
        {personalInfo.photo && (
          <div className="w-[140px] h-[160px] shrink-0 bg-white p-1 shadow-lg transform translate-y-2">
            <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover grayscale-[20%]" />
          </div>
        )}
      </header>

      {/* Main Content Area - Single Column Timeline Style */}
      <div className="flex-1 px-14 py-10 relative flex flex-col">
        
        {/* The Continuous Timeline Line */}
        <div className="absolute top-10 bottom-10 left-[75px] w-px bg-gray-300 z-0"></div>

        {/* Contacts / Web Links Section mapped dynamically if Github/Portfolio/Linkedin exist */}
        {(personalInfo.linkedin || personalInfo.github || personalInfo.portfolio) && (
          <section className="relative z-10 mb-8 pl-12 pr-4">
            <SectionHeader icon={LinkIcon} title="Websites, Portfolios, Profiles" />
            
            <div className="relative mb-6">
              <div className="absolute -left-[58px] top-1.5 w-3 h-3 bg-[#0e5076] transform rotate-45 z-10"></div>
              <ul className="text-[0.85rem] text-slate-700 leading-relaxed font-mono">
                {personalInfo.linkedin && <li>• https://{personalInfo.linkedin.replace(/^https?:\/\//, '')}</li>}
                {personalInfo.github && <li>• https://{personalInfo.github.replace(/^https?:\/\//, '')}</li>}
                {personalInfo.portfolio && <li>• https://{personalInfo.portfolio.replace(/^https?:\/\//, '')}</li>}
              </ul>
            </div>
          </section>
        )}

        {/* Global Summary embedded inside the main timeline */}
        {personalInfo.summary && isVisible('summary') && (
          <section style={{ order: getOrder('summary') }} className="relative z-10 mb-10 pl-[4.5rem] pr-4">
            <p className="text-[0.85rem] text-slate-700 leading-relaxed text-justify">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Skills Section */}
        {skills?.length > 0 && isVisible('skills') && (
          <section style={{ order: getOrder('skills') }} className="relative z-10 mb-10 pl-12 pr-4">
            <SectionHeader icon={Puzzle} title="Skills" />
            
            <div className="flex flex-col gap-3 relative">
              {/* Dynamically chunk skills into rows to match the diamond bullet aesthetics */}
              {Array.from({ length: Math.ceil(skills.length / 5) }).map((_, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[58px] top-1.5 w-3 h-3 bg-[#0e5076] transform rotate-45 z-10"></div>
                  <div className="text-[0.9rem] text-slate-700 font-medium">
                    {skills.slice(i * 5, (i + 1) * 5).join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {experience?.length > 0 && isVisible('experience') && (
          <section style={{ order: getOrder('experience') }} className="relative z-10 mb-10 pl-12 pr-4">
            <SectionHeader icon={Briefcase} title="Experience" />
            
            <div className="space-y-6">
              {experience.map(exp => (
                <div key={exp.id} className="relative break-inside-avoid">
                  <div className="absolute -left-[58px] top-2 w-3 h-3 bg-[#0e5076] transform rotate-45 z-10"></div>
                  
                  {/* Two column layout specifically inside the timeline event */}
                  <div className="flex gap-4">
                    <div className="w-[120px] shrink-0 pt-0.5">
                      <div className="font-bold text-gray-900 text-[0.85rem] leading-tight">
                        {exp.startDate} - <br />{exp.endDate || 'Current'}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-[1.1rem] leading-tight mb-0.5">{exp.position}</h4>
                      <div className="text-gray-600 italic text-[0.9rem] mb-2">{exp.company} {exp.address ? `, ${exp.address}` : ''}</div>


                      <ul className="pl-0 mt-2">
                        {renderBulletPoints(exp.description)}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education?.length > 0 && isVisible('education') && (
          <section style={{ order: getOrder('education') }} className="relative z-10 mb-10 pl-12 pr-4">
            <SectionHeader icon={GraduationCap} title="Education" />
            
            <div className="space-y-6">
              {education.map(edu => (
                <div key={edu.id} className="relative break-inside-avoid">
                  <div className="absolute -left-[58px] top-2 w-3 h-3 bg-[#0e5076] transform rotate-45 z-10"></div>
                  
                  <div className="flex gap-4">
                    <div className="w-[120px] shrink-0 pt-0.5">
                      <div className="font-bold text-gray-900 text-[0.85rem] leading-tight">
                        {edu.startDate} - <br />{edu.endDate || 'Current'}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-[1.05rem] leading-tight mb-0.5">{edu.degree}</h4>
                      <div className="text-gray-600 italic text-[0.9rem] mb-1">{edu.institution} {edu.address ? `- ${edu.address}` : ''}</div>
                      {edu.description && <p className="text-[0.85rem] text-slate-700 leading-relaxed font-mono mt-1">{edu.description}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects?.length > 0 && isVisible('projects') && (
          <section style={{ order: getOrder('projects') }} className="relative z-10 mb-10 pl-12 pr-4">
            <SectionHeader icon={FolderOpen} title="Projects" />
            
            <div className="space-y-6">
              {projects.map(proj => (
                <div key={proj.id} className="relative break-inside-avoid">
                  <div className="absolute -left-[58px] top-2 w-3 h-3 bg-[#0e5076] transform rotate-45 z-10"></div>
                  
                  <div className="flex flex-col">
                    <h4 className="font-bold text-gray-900 text-[1.05rem] leading-tight mb-0.5">{proj.title}</h4>
                    {proj.link && proj.link !== 'In Development' && (
                      <div className="text-[0.8rem] mb-2 font-mono">
                        <span className="font-bold text-gray-900">Link: </span>
                        <a href={`https://${proj.link}`} className="text-blue-600 underline break-all">{proj.link.replace(/^https?:\/\//, '')}</a>
                      </div>
                    )}
                    <h5 className="font-bold text-gray-900 text-[0.9rem] mb-1 mt-1">Key Contributions</h5>
                    <ul className="pl-0">
                      {renderBulletPoints(proj.description)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages Section */}
        {languages?.length > 0 && isVisible('languages') && (
          <section style={{ order: getOrder('languages') }} className="relative z-10 pl-12 pr-4 mb-10">
            <SectionHeader icon={Flag} title="Languages" />
            
            <div className="space-y-3">
              {languages.map((lang, index) => (
                <div key={index} className="relative break-inside-avoid">
                  <div className="absolute -left-[58px] top-1.5 w-3 h-3 bg-[#0e5076] transform rotate-45 z-10"></div>
                  <div className="text-[0.9rem] text-slate-700 font-medium">{lang}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections dynamically mapped to the timeline flow natively */}
        {customSections?.length > 0 && isVisible('custom') && customSections.map((section, sIdx) => {
          if (!section.title || !section.items || section.items.length === 0) return null;
          return (
            <section style={{ order: getOrder('custom') }} key={section.id || sIdx} className="relative z-10 mb-10 pl-12 pr-4">
              <SectionHeader icon={Puzzle} title={section.title} />
              <div className="space-y-6">
                {section.items.map((item, iIdx) => (
                  <div key={item.id || iIdx} className="relative break-inside-avoid">
                    <div className="absolute -left-[58px] top-2 w-3 h-3 bg-[#0e5076] transform rotate-45 z-10"></div>
                    <div className="flex gap-4">
                      {item.date && (
                        <div className="w-[120px] shrink-0 pt-0.5">
                          <div className="font-bold text-gray-900 text-[0.85rem] leading-tight">{item.date}</div>
                        </div>
                      )}
                      <div className="flex-1">
                        {item.header && <h4 className="font-bold text-gray-900 text-[1.05rem] leading-tight mb-0.5">{item.header}</h4>}
                        {item.subHeader && <div className="text-gray-600 italic text-[0.9rem] mb-1">{item.subHeader}</div>}
                        {item.description && <div className="mt-2"><ul className="pl-0">{renderBulletPoints(item.description)}</ul></div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}

      </div>

    </div>
  );
}
