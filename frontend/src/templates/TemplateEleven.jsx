import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Github, Globe, Monitor, Award } from 'lucide-react';

export default function TemplateEleven({ data }) {
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
        <li key={idx} className="flex items-start text-[0.85rem] text-gray-700 leading-relaxed mb-1.5 break-inside-avoid">
          <span className="text-gray-500 mr-2 mt-1.5 shrink-0 text-[0.35rem]">●</span>
          <span>{cleanLine}</span>
        </li>
      );
    });
  };

  const RightSectionHeader = ({ title }) => (
    <div className="mb-3">
      <h3 className="text-[0.85rem] font-semibold text-gray-500 uppercase tracking-widest mb-1.5 font-sans">
        {title}
      </h3>
      <div className="w-full h-px bg-gray-300"></div>
    </div>
  );

  return (
    <>
      {/* Header */}
      <header className="bg-[#0f6762] text-white p-10 px-12 flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="flex-1">
          <h1 className="text-[2.5rem] font-semibold uppercase tracking-wide leading-tight mb-2">
            {personalInfo?.firstName} {personalInfo?.lastName}
          </h1>

          <h2 className="text-[1.2rem] font-medium text-teal-100 mb-4">
            {personalInfo?.title}
          </h2>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[0.85rem] text-teal-50 font-medium pb-1">

            {personalInfo?.phone && (
              <div className="flex items-center gap-1.5">
                <Phone size={14} className="text-teal-300" />
                <span>{personalInfo.phone}</span>
              </div>
            )}

            {personalInfo?.email && (
              <div className="flex items-center gap-1.5">
                <Mail size={14} className="text-teal-300" />
                <span>{personalInfo.email}</span>
              </div>
            )}

            {personalInfo?.linkedin && (
              <div className="flex items-center gap-1.5">
                <Linkedin size={14} className="text-teal-300" />
                <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}

            {personalInfo?.github && (
              <div className="flex items-center gap-1.5">
                <Github size={14} className="text-teal-300" />
                <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}

            {personalInfo?.portfolio && (
              <div className="flex items-center gap-1.5">
                <Globe size={14} className="text-teal-300" />
                <span>{personalInfo.portfolio.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}

            {personalInfo?.address && (
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-teal-300" />
                <span>{personalInfo.address}</span>
              </div>
            )}

          </div>
        </div>

        {personalInfo?.photo && (
          <div className="shrink-0 flex justify-center mt-2 hidden sm:block">
            <img
              src={personalInfo.photo}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-[#0f6762] shadow-xl bg-white"
            />
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="block columns-1 md:columns-2 gap-10 flex-1 px-12 py-10 w-full overflow-hidden bg-white">

        {(!layout || layout.length === 0) ? null : layout.map(section => {

          if (!section.visible) return null;

          if (section.id === 'summary' && personalInfo?.summary) {
            return (
              <section key="summary" className="break-inside-avoid mb-8">
                <RightSectionHeader title="Professional Summary" />
                <p className="text-[0.85rem] text-gray-700 leading-relaxed pt-1">
                  {personalInfo.summary}
                </p>
              </section>
            );
          }

          if (section.id === 'experience' && experience?.length > 0) {
            return (
              <section key="experience" className="break-inside-avoid mb-8">
                <RightSectionHeader title="Work Experience" />
                <div className="space-y-6 pt-1">
                  {experience.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-semibold text-gray-800">{exp.position}</h4>
                        <span className="text-gray-500 text-sm">
                          {exp.startDate} {exp.endDate ? `– ${exp.endDate}` : ''}
                        </span>
                      </div>

                      <div className="text-[#0f6762] font-medium text-sm mb-2">
                        {exp.company}
                      </div>

                      <ul>
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
                <RightSectionHeader title="Education" />

                <div className="space-y-4 pt-1">
                  {education.map(edu => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-semibold text-gray-800">
                          {edu.degree}
                        </h4>

                        <span className="text-gray-500 text-sm">
                          {edu.startDate} {edu.endDate ? `– ${edu.endDate}` : ''}
                        </span>
                      </div>

                      <div className="text-[#0f6762] font-medium text-sm">
                        {edu.institution}
                      </div>

                      {edu.description && (
                        <p className="text-sm text-gray-700 mt-1">
                          {edu.description}
                        </p>
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
                <RightSectionHeader title="Technical Skills" />

                <div className="text-[0.85rem] text-[#0f6762] leading-relaxed font-bold pt-1">
                  {skills.join(' · ')}
                </div>
              </section>
            );
          }

          if (section.id === 'projects' && projects?.length > 0) {
            return (
              <section key="projects" className="break-inside-avoid mb-8">
                <RightSectionHeader title="Projects" />

                <div className="space-y-5">
                  {projects.map(proj => (
                    <div key={proj.id} className="flex items-start gap-3">
                      <Monitor size={14} className="text-[#0f6762] mt-1" />

                      <div>
                        <h4 className="font-semibold text-[#0f6762]">
                          {proj.title}
                        </h4>

                        {proj.description && (
                          <p className="text-sm text-gray-700">
                            {proj.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'certifications' && certifications?.length > 0) {
            return (
              <section key="certifications" className="break-inside-avoid mb-8">
                <RightSectionHeader title="Certifications" />

                <div className="space-y-4">
                  {certifications.map(cert => (
                    <div key={cert.id} className="flex items-start gap-3">
                      <Award size={14} className="text-[#0f6762] mt-1" />

                      <div>
                        <h4 className="font-semibold text-[#0f6762]">
                          {cert.name}
                        </h4>

                        <div className="text-gray-500 text-sm">
                          {cert.issuer} {cert.date ? `| ${cert.date}` : ''}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section.id === 'languages' && languages?.length > 0) {
            return (
              <section key="languages" className="break-inside-avoid mb-8">
                <RightSectionHeader title="Languages" />

                <div className="space-y-2">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Globe size={14} className="text-[#0f6762]" />
                      <span className="text-gray-700">{lang}</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          return null;
        })}

      </div>
    </>
  );
}
