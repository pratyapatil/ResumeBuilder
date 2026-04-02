import React from 'react';

export default function TemplateOne({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages, customSections, layout } = data;

  const isVisible = (id) => {
    if (!layout) return true;
    const item = layout.find(item => item.id === id);
    return item ? item.visible : true;
  };

  return (
    <div className="p-8 bg-white text-gray-900 font-sans min-h-full flex flex-col w-full">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-sm text-gray-600">
          {personalInfo.email} | {personalInfo.phone} | {personalInfo.address}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.linkedin && personalInfo.github && <span> | </span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </p>
      </header>

      <div className="flex-1 w-full">
        {(!layout || layout.length === 0) ? <div /> : layout.map(section => {
          if (!section.visible) return null;

          if (section.id === 'summary' && personalInfo.summary) {
            return (
              <section key="summary" className="mb-6 break-inside-avoid">
                <h2 className="text-lg font-bold border-b-2 border-gray-900 mb-2 uppercase">Summary</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
              </section>
            );
          }

          if (section.id === 'experience' && experience?.length > 0) {
            return (
              <section key="experience" className="mb-6 break-inside-avoid">
                <h2 className="text-lg font-bold border-b-2 border-gray-900 mb-2 uppercase">Experience</h2>
                <div className="space-y-4">
                  {experience.map(exp => (
                    <div key={exp.id} className="break-inside-avoid">
                      <div className="flex justify-between font-bold text-gray-800">
                        <span>{exp.position}</span>
                        <span>{exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}</span>
                      </div>
                      <div className="text-gray-700 font-semibold mb-1">{exp.company}</div>
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'education' && education?.length > 0) {
            return (
              <section key="education" className="mb-6 break-inside-avoid">
                <h2 className="text-lg font-bold border-b-2 border-gray-900 mb-2 uppercase">Education</h2>
                <div className="space-y-4">
                  {education.map(edu => (
                    <div key={edu.id} className="break-inside-avoid">
                      <div className="flex justify-between font-bold text-gray-800">
                        <span>{edu.degree}</span>
                        <span>{edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ''}</span>
                      </div>
                      <div className="text-gray-700 font-semibold mb-1">{edu.institution}</div>
                      {edu.description && <p className="text-sm text-gray-600">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'projects' && projects?.length > 0) {
            return (
              <section key="projects" className="mb-6 break-inside-avoid">
                <h2 className="text-lg font-bold border-b-2 border-gray-900 mb-2 uppercase">Projects</h2>
                <div className="space-y-4">
                  {projects.map(proj => (
                    <div key={proj.id} className="break-inside-avoid">
                      <div className="flex justify-between font-bold text-gray-800">
                        <span>{proj.title}</span>
                        {proj.link && <span className="text-sm font-normal text-blue-600">{proj.link}</span>}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'skills' && skills?.length > 0) {
            return (
              <section key="skills" className="mb-6 break-inside-avoid">
                <h2 className="text-lg font-bold border-b-2 border-gray-900 mb-2 uppercase">Skills</h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {skills.join(' • ')}
                </p>
              </section>
            );
          }
          
          if (section.id === 'certifications' && certifications?.length > 0) {
            return (
              <section key="certifications" className="mb-6 break-inside-avoid">
                <h2 className="text-lg font-bold border-b-2 border-gray-900 mb-2 uppercase">Certifications</h2>
                <div className="space-y-4">
                  {certifications.map(cert => (
                    <div key={cert.id} className="break-inside-avoid">
                      <div className="font-bold text-gray-800">{cert.name}</div>
                      <div className="text-gray-700 font-semibold mb-1">{cert.issuer} {cert.date ? `| ${cert.date}` : ''}</div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'languages' && languages?.length > 0) {
            return (
              <section key="languages" className="mb-6 break-inside-avoid">
                <h2 className="text-lg font-bold border-b-2 border-gray-900 mb-2 uppercase">Languages</h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {languages.join(' • ')}
                </p>
              </section>
            );
          }
          
          if (section.id === 'custom' && customSections?.length > 0) {
            return customSections.map((customSection, sIdx) => {
              if (!customSection.title || !customSection.items || customSection.items.length === 0) return null;
              return (
                <section key={`custom_${customSection.id || sIdx}`} className="mb-6 break-inside-avoid">
                  <h2 className="text-lg font-bold border-b-2 border-gray-900 mb-2 uppercase">{customSection.title}</h2>
                  <div className="space-y-4">
                    {customSection.items.map((item, iIdx) => (
                      <div key={item.id || iIdx} className="break-inside-avoid">
                        <div className="flex justify-between font-bold text-gray-800">
                          {item.header && <span>{item.header}</span>}
                          {item.date && <span>{item.date}</span>}
                        </div>
                        {item.subHeader && <div className="text-gray-700 font-semibold mb-1">{item.subHeader}</div>}
                        {item.description && <p className="text-sm text-gray-600 whitespace-pre-wrap">{item.description}</p>}
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
