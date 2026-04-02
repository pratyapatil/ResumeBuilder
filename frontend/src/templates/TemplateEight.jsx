import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Github } from 'lucide-react';

export default function TemplateEight({ data }) {
  const { personalInfo, experience, education, skills, projects, languages, customSections, layout } = data;

  const renderBulletPoints = (text) => {
    if (!text) return null;

    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

    return lines.map((line, idx) => {
      const cleanLine = line.replace(/^[•\-\*]/, '').trim();

      return (
        <li key={idx} className="flex items-start text-[0.8rem] text-gray-700 leading-relaxed mb-1 break-inside-avoid">
          <span className="text-gray-400 mr-2 mt-1 shrink-0 text-[0.6rem]">●</span>
          <span>{cleanLine}</span>
        </li>
      );
    });
  };

  return (
    <div className="bg-white text-gray-800 font-sans min-h-full flex flex-col w-full relative">

      <div className="w-full px-10 pt-10 pb-0 bg-white">

        {/* Header */}
        <header className="mb-2">
          <h1 className="text-[2.2rem] font-bold text-[#475569] uppercase tracking-wide leading-tight mb-1">
            {personalInfo?.firstName} {personalInfo?.lastName}
          </h1>

          <h2 className="text-[1.1rem] font-medium text-blue-500 mb-3">
            {personalInfo?.title}
          </h2>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[0.8rem] text-gray-500 font-medium pb-2">

            {personalInfo?.phone && (
              <div className="flex items-center gap-1.5">
                <Phone size={12} className="text-gray-400" />
                <span>{personalInfo.phone}</span>
              </div>
            )}

            {personalInfo?.email && (
              <div className="flex items-center gap-1.5">
                <Mail size={12} className="text-gray-400" />
                <span>{personalInfo.email}</span>
              </div>
            )}

            {personalInfo?.linkedin && (
              <div className="flex items-center gap-1.5">
                <Linkedin size={12} className="text-gray-400" />
                <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}

            {personalInfo?.github && (
              <div className="flex items-center gap-1.5">
                <Github size={12} className="text-gray-400" />
                <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}

            {personalInfo?.address && (
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-gray-400" />
                <span>{personalInfo.address}</span>
              </div>
            )}

          </div>
        </header>

        {/* Photo */}
        {personalInfo?.photo && (
          <div className="absolute top-10 right-10 flex justify-center mt-2 z-10 hidden sm:block">
            <img
              src={personalInfo.photo}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl bg-white"
            />
          </div>
        )}

        {/* Content */}
        <div className="block columns-1 md:columns-2 gap-10 flex-1 px-10 pb-10 w-full mt-6">

          {(!layout || layout.length === 0)
            ? null
            : layout.map(section => {

              if (!section.visible) return null;

              if (section.id === 'summary' && personalInfo?.summary) {
                return (
                  <section key="summary" className="break-inside-avoid mb-8">
                    <h3 className="text-[0.9rem] font-semibold text-[#475569] uppercase tracking-widest mb-2">
                      Summary
                    </h3>
                    <p className="text-[0.85rem] text-gray-700 leading-relaxed">
                      {personalInfo.summary}
                    </p>
                  </section>
                );
              }

              if (section.id === 'experience' && experience?.length > 0) {
                return (
                  <section key="experience" className="break-inside-avoid mb-8">
                    <h3 className="text-[0.9rem] font-semibold text-[#475569] uppercase tracking-widest mb-4">
                      Experience
                    </h3>

                    <div className="space-y-5">
                      {experience.map(exp => (
                        <div key={exp.id}>

                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-semibold text-gray-700 text-[0.95rem]">
                              {exp.position}
                            </h4>

                            <span className="text-gray-500 text-[0.8rem]">
                              {exp.startDate} {exp.endDate ? `– ${exp.endDate}` : ''}
                            </span>
                          </div>

                          <div className="text-blue-500 font-medium text-[0.85rem] mb-2">
                            {exp.company}
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

              if (section.id === 'skills' && skills?.length > 0) {
                return (
                  <section key="skills" className="break-inside-avoid mb-8">
                    <h3 className="text-[0.85rem] font-semibold text-[#475569] uppercase tracking-widest mb-4">
                      Skills
                    </h3>

                    <div className="text-[0.8rem] text-slate-700 leading-relaxed font-medium">
                      {skills.join(' - ')}
                    </div>
                  </section>
                );
              }

              return null;
            })}

        </div>

      </div>

    </div>
  );
}
