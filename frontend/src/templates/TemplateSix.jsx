import React from 'react';

export default function TemplateSix({ data }) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="bg-stone-50 font-serif h-full text-stone-900 border-x-8 border-stone-800">
      <header className="p-10 flex flex-col items-center bg-stone-100 border-b border-stone-300 relative">
        {personalInfo.photo && (
          <img 
            src={personalInfo.photo} 
            alt="Profile" 
            className="w-28 h-28 rounded-full shadow-md object-cover border-2 border-stone-800 mb-4"
          />
        )}
        <h1 className="text-4xl font-semibold uppercase tracking-[0.2em] mb-2 text-center">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-xl text-stone-600 italic font-serif mb-4 text-center">
          {personalInfo.title}
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-stone-600 font-sans tracking-wide">
          <span>{personalInfo.phone}</span>
          <span>|</span>
          <span>{personalInfo.email}</span>
          <span>|</span>
          <span>{personalInfo.address}</span>
          {personalInfo.linkedin && (
            <>
              <span>|</span>
              <span>{personalInfo.linkedin}</span>
            </>
          )}
        </div>
      </header>

      <div className="p-10 space-y-8">
        {personalInfo.summary && (
          <section className="text-center max-w-2xl mx-auto">
            <p className="text-base text-stone-700 leading-relaxed italic border-y py-4 border-stone-300">
              "{personalInfo.summary}"
            </p>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-4">
          <div className="md:col-span-8 flex flex-col gap-8">
            {experience?.length > 0 && (
              <section>
                <div className="flex items-center mb-6">
                  <h3 className="text-2xl font-bold uppercase tracking-widest text-stone-800 shrink-0">Experience</h3>
                  <div className="ml-4 h-[1px] bg-stone-300 w-full"></div>
                </div>
                <div className="space-y-6">
                  {experience.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-semibold text-xl text-stone-900">{exp.position}</h4>
                        <span className="text-sm font-sans text-stone-500 uppercase tracking-wider">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <div className="text-stone-600 font-medium mb-3 font-sans tracking-wide text-sm">{exp.company}</div>
                      <p className="text-sm text-stone-700 leading-relaxed font-sans">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {projects?.length > 0 && (
              <section>
                <div className="flex items-center mb-6">
                  <h3 className="text-2xl font-bold uppercase tracking-widest text-stone-800 shrink-0">Projects</h3>
                  <div className="ml-4 h-[1px] bg-stone-300 w-full"></div>
                </div>
                <div className="space-y-6">
                  {projects.map(proj => (
                    <div key={proj.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-semibold text-lg text-stone-900">{proj.title}</h4>
                      </div>
                      <a href={`https://${proj.link}`} className="text-stone-500 font-sans text-xs mb-2 block">{proj.link}</a>
                      <p className="text-sm text-stone-700 leading-relaxed font-sans">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="md:col-span-4 flex flex-col gap-8">
            {skills?.length > 0 && (
              <section>
                <div className="flex items-center mb-6">
                  <h3 className="text-xl font-bold uppercase tracking-widest text-stone-800 shrink-0">Expertise</h3>
                  <div className="ml-4 h-[1px] bg-stone-300 w-full"></div>
                </div>
                <ul className="text-sm font-sans space-y-3 text-stone-700 leading-relaxed">
                  {skills.map((skill, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-stone-400 mt-[2px]">▸</span> {skill}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {education?.length > 0 && (
              <section>
                <div className="flex items-center mb-6">
                  <h3 className="text-xl font-bold uppercase tracking-widest text-stone-800 shrink-0">Education</h3>
                  <div className="ml-4 h-[1px] bg-stone-300 w-full"></div>
                </div>
                <div className="space-y-6">
                  {education.map(edu => (
                    <div key={edu.id}>
                      <h4 className="font-semibold text-stone-900">{edu.degree}</h4>
                      <div className="text-sm font-sans text-stone-600 mb-1">{edu.institution}</div>
                      <div className="text-xs font-sans text-stone-500 tracking-wider mix-blend-multiply">{edu.startDate} - {edu.endDate}</div>
                      {edu.description && <p className="text-sm mt-2 text-stone-700 font-sans">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
