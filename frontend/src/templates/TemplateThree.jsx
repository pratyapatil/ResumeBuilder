import React from 'react';

export default function TemplateThree({ data }) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="p-8 bg-slate-50 text-slate-900 font-mono h-full text-sm">
      <header className="mb-8">
        <h1 className="text-3xl font-black mb-2 text-green-700">
          &gt;&nbsp;{personalInfo.firstName}_{personalInfo.lastName}
        </h1>
        <div className="text-slate-600 space-y-1">
          <p>/* {personalInfo.title} */</p>
          <p>const email = "{personalInfo.email}";</p>
          <p>const phone = "{personalInfo.phone}";</p>
          {personalInfo.github && <p>const github = "{personalInfo.github}";</p>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-green-700 mb-2"># ABOUT_ME</h2>
          <p className="text-slate-700 bg-slate-200 p-3 rounded">{personalInfo.summary}</p>
        </section>
      )}

      {skills?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-green-700 mb-2"># SKILLS</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs border border-green-300">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-green-700 mb-2"># WORK_EXPERIENCE</h2>
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id} className="border-l-2 border-green-500 pl-4">
                <div className="font-bold text-base">{exp.position} @ {exp.company}</div>
                <div className="text-slate-500 text-xs mb-2">[{exp.startDate} - {exp.endDate}]</div>
                <p className="text-slate-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-green-700 mb-2"># PROJECTS</h2>
          <div className="space-y-4">
            {projects.map(proj => (
              <div key={proj.id} className="border-l-2 border-green-500 pl-4">
                <div className="font-bold">
                  {proj.title} 
                  {proj.link && <a href={`https://${proj.link}`} className="text-blue-500 ml-2 font-normal text-xs">({proj.link})</a>}
                </div>
                <p className="text-slate-700 mt-1">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-green-700 mb-2"># EDUCATION</h2>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id} className="border-l-2 border-green-500 pl-4">
                <div className="font-bold">{edu.degree}</div>
                <div className="text-slate-600">{edu.institution}</div>
                <div className="text-slate-500 text-xs">[{edu.startDate} - {edu.endDate}]</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
