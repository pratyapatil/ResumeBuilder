import React from 'react';

export default function TemplateFour({ data }) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="flex bg-white h-full font-sans text-gray-800">
      {/* Sidebar */}
      <div className="w-1/3 bg-slate-800 text-white p-8 space-y-8 flex flex-col shrink-0">
        <div className="text-center">
          {personalInfo.photo ? (
            <img 
              src={personalInfo.photo} 
              alt="Profile" 
              className="w-32 h-32 rounded-full border-4 border-slate-600 mx-auto object-cover mb-4"
            />
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-slate-600 mx-auto bg-slate-700 flex flex-col justify-center items-center mb-4 text-xs text-slate-400 text-center px-2">
              Photo<br/>Location
            </div>
          )}
          <h2 className="text-xl font-bold uppercase tracking-wider">{personalInfo.firstName}</h2>
          <h2 className="text-xl font-light uppercase tracking-wider mb-2">{personalInfo.lastName}</h2>
          <div className="text-slate-400 text-sm">{personalInfo.title}</div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-300 border-b border-slate-600 pb-2 mb-4">Contact</h3>
          <ul className="text-sm space-y-3 text-slate-300">
            {personalInfo.phone && <li>{personalInfo.phone}</li>}
            {personalInfo.email && <li className="break-words">{personalInfo.email}</li>}
            {personalInfo.address && <li>{personalInfo.address}</li>}
            {personalInfo.linkedin && <li className="break-words">{personalInfo.linkedin}</li>}
          </ul>
        </div>

        {skills?.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-300 border-b border-slate-600 pb-2 mb-4">Skills</h3>
            <ul className="text-sm space-y-2 text-slate-300">
              {skills.map((skill, index) => (
                <li key={index}>• {skill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8 space-y-8 bg-gray-50 flex-1">
        {personalInfo.summary && (
          <section>
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-white flex justify-center items-center text-xs">P</span>
              Profile
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {experience?.length > 0 && (
          <section>
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-white flex justify-center items-center text-xs">E</span>
              Experience
            </h3>
            <div className="space-y-6">
              {experience.map(exp => (
                <div key={exp.id} className="relative pl-6 border-l border-slate-300">
                  <div className="absolute w-3 h-3 bg-slate-800 rounded-full -left-[6.5px] top-1"></div>
                  <h4 className="font-bold text-lg text-slate-800">{exp.position}</h4>
                  <div className="text-slate-500 font-semibold mb-1 text-sm">{exp.company} <span className="font-normal mx-2">|</span> <span className="text-gray-400">{exp.startDate} - {exp.endDate}</span></div>
                  <p className="text-sm text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education?.length > 0 && (
          <section>
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-white flex justify-center items-center text-xs">A</span>
              Education
            </h3>
            <div className="space-y-6">
              {education.map(edu => (
                <div key={edu.id} className="relative pl-6 border-l border-slate-300">
                  <div className="absolute w-3 h-3 bg-slate-800 rounded-full -left-[6.5px] top-1"></div>
                  <h4 className="font-bold text-lg text-slate-800">{edu.degree}</h4>
                  <div className="text-slate-500 font-semibold mb-1 text-sm">{edu.institution} <span className="font-normal mx-2">|</span> <span className="text-gray-400">{edu.startDate} - {edu.endDate}</span></div>
                  <p className="text-sm text-gray-600">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects?.length > 0 && (
          <section>
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-white flex justify-center items-center text-xs">W</span>
              Projects
            </h3>
            <div className="space-y-4">
              {projects.map(proj => (
                <div key={proj.id} className="pl-6">
                  <h4 className="font-bold text-md text-slate-800">{proj.title}</h4>
                  <a href={`https://${proj.link}`} className="text-blue-500 text-xs mb-1 block">{proj.link}</a>
                  <p className="text-sm text-gray-600">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
