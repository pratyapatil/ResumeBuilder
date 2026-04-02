import React from 'react';

export default function TemplateTwo({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages, customSections, layout } = data;

  const isVisible = (id) => {
    if (!layout) return true;
    const item = layout.find(item => item.id === id);
    return item ? item.visible : true;
  };

  return (
    <div className="p-8 bg-white text-slate-800 font-serif min-h-full flex flex-col w-full">
      <header className="border-b-4 border-blue-800 pb-4 mb-6">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <h2 className="text-xl text-slate-600 italic mb-2">{personalInfo.title}</h2>
        <div className="flex flex-wrap gap-4 text-sm text-slate-700">
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <span>{personalInfo.address}</span>
          {personalInfo.linkedin && (
            <>
              <span>•</span>
              <span>{personalInfo.linkedin}</span>
            </>
          )}
        </div>
      </header>

      <div className="block columns-1 md:columns-2 gap-8 flex-1 w-full pb-8">
        {(!layout || layout.length === 0) ? <div /> : layout.map(section => {
          if (!section.visible) return null;

          if (section.id === 'summary' && personalInfo.summary) {
            return (
              <section key="summary" className="break-inside-avoid mb-6">
                 <h3 className="text-xl font-bold text-blue-900 mb-3 border-b-2 border-slate-200 pb-1">Summary</h3>
                <p className="text-sm leading-relaxed text-slate-700">{personalInfo.summary}</p>
              </section>
            );
          }

          if (section.id === 'experience' && experience?.length > 0) {
            return (
              <section key="experience" className="break-inside-avoid mb-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3 border-b-2 border-slate-200 pb-1">Professional Experience</h3>
                <div className="space-y-4">
                  {experience.map(exp => (
                    <div key={exp.id} className="break-inside-avoid">
                      <h4 className="font-bold text-lg leading-tight">{exp.position}</h4>
                      <div className="flex justify-between items-baseline text-blue-800 font-semibold mb-1">
                        <span>{exp.company}</span>
                        <span className="text-slate-500 italic text-sm ml-4 shrink-0">{exp.startDate} {exp.endDate ? `– ${exp.endDate}` : ''}</span>
                      </div>
                      <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'projects' && projects?.length > 0) {
            return (
              <section key="projects" className="break-inside-avoid mb-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3 border-b-2 border-slate-200 pb-1">Key Projects</h3>
                <div className="space-y-4">
                  {projects.map(proj => (
                    <div key={proj.id} className="break-inside-avoid">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-lg leading-tight">{proj.title}</h4>
                        <span className="text-blue-600 text-[0.8rem] ml-4 shrink-0">{proj.link}</span>
                      </div>
                      <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'skills' && skills?.length > 0) {
            return (
              <section key="skills" className="break-inside-avoid mb-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3 border-b-2 border-slate-200 pb-1">Expertise</h3>
                <div className="flex flex-wrap gap-2 text-sm text-slate-700 font-medium">
                  {skills.map((skill, index) => (
                    <span key={index} className="bg-slate-100 border border-slate-200 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'education' && education?.length > 0) {
            return (
              <section key="education" className="break-inside-avoid mb-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3 border-b-2 border-slate-200 pb-1">Education</h3>
                <div className="space-y-4">
                  {education.map(edu => (
                    <div key={edu.id} className="break-inside-avoid">
                      <h4 className="font-bold text-slate-800 leading-tight">{edu.degree}</h4>
                      <p className="text-blue-800 text-[0.9rem] font-semibold mt-0.5">{edu.institution}</p>
                      <p className="text-[0.8rem] text-slate-500 italic mt-0.5">{edu.startDate} {edu.endDate ? `– ${edu.endDate}` : ''}</p>
                      {edu.description && <p className="text-[0.8rem] text-slate-700 mt-1 whitespace-pre-wrap">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            );
          }
          
          if (section.id === 'certifications' && certifications?.length > 0) {
            return (
              <section key="certifications" className="break-inside-avoid mb-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3 border-b-2 border-slate-200 pb-1">Certifications</h3>
                <div className="space-y-4">
                  {certifications.map(cert => (
                    <div key={cert.id} className="break-inside-avoid">
                      <h4 className="font-bold text-slate-800 leading-tight">{cert.name}</h4>
                      <div className="text-blue-800 text-[0.9rem] font-semibold mt-0.5">{cert.issuer} {cert.date ? `| ${cert.date}` : ''}</div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'languages' && languages?.length > 0) {
            return (
              <section key="languages" className="break-inside-avoid mb-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3 border-b-2 border-slate-200 pb-1">Languages</h3>
                <div className="text-sm text-slate-700 font-medium leading-relaxed">
                  {languages.join(' • ')}
                </div>
              </section>
            );
          }
          
          if (section.id === 'custom' && customSections?.length > 0) {
            return customSections.map((customSection, sIdx) => {
              if (!customSection.title || !customSection.items || customSection.items.length === 0) return null;
              return (
                <section key={`custom_${customSection.id || sIdx}`} className="break-inside-avoid mb-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-3 border-b-2 border-slate-200 pb-1">{customSection.title}</h3>
                  <div className="space-y-4">
                    {customSection.items.map((item, iIdx) => (
                      <div key={item.id || iIdx} className="break-inside-avoid">
                        <div className="flex justify-between items-baseline mb-1">
                          {item.header && <h4 className="font-bold text-lg leading-tight">{item.header}</h4>}
                          {item.date && <span className="text-slate-500 italic text-[0.8rem] ml-4 shrink-0">{item.date}</span>}
                        </div>
                        {item.subHeader && <div className="text-blue-800 font-semibold mb-1">{item.subHeader}</div>}
                        {item.description && <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{item.description}</p>}
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
