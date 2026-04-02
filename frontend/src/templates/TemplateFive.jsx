import React from 'react';

export default function TemplateFive({ data }) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="bg-white font-sans h-full text-gray-800">
      <header className="bg-emerald-600 text-white p-8 pb-16 relative">
        <div className="max-w-3xl mx-auto flex items-center gap-8">
          <div>
            {personalInfo.photo ? (
              <img 
                src={personalInfo.photo} 
                alt="Profile" 
                className="w-32 h-32 rounded-lg shadow-xl object-cover border-4 border-emerald-500"
              />
            ) : (
              <div className="w-32 h-32 rounded-lg bg-emerald-700 border-4 border-emerald-500 flex justify-center items-center text-sm shadow-xl text-center">
                Photo<br/>Placeholder
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-extrabold mb-2 tracking-tight">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <h2 className="text-2xl font-light text-emerald-100">{personalInfo.title}</h2>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto -mt-8 relative z-10 px-8 flex gap-8 pb-12">
        <div className="w-1/3 space-y-8 bg-white p-6 shadow-xl rounded-lg">
          <section>
            <h3 className="text-lg font-bold text-emerald-700 uppercase mb-3">Contact</h3>
            <ul className="text-sm space-y-3 text-gray-600 font-medium">
              {personalInfo.phone && <li className="flex items-center gap-2"><span className="text-emerald-500">📞</span> {personalInfo.phone}</li>}
              {personalInfo.email && <li className="flex items-center gap-2 break-all"><span className="text-emerald-500">✉️</span> {personalInfo.email}</li>}
              {personalInfo.address && <li className="flex items-center gap-2"><span className="text-emerald-500">📍</span> {personalInfo.address}</li>}
              {personalInfo.linkedin && <li className="flex items-center gap-2 break-all"><span className="text-emerald-500">🔗</span> {personalInfo.linkedin}</li>}
              {personalInfo.github && <li className="flex items-center gap-2 break-all"><span className="text-emerald-500">💻</span> {personalInfo.github}</li>}
            </ul>
          </section>

          {skills?.length > 0 && (
            <section>
              <h3 className="text-lg font-bold text-emerald-700 uppercase mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education?.length > 0 && (
            <section>
              <h3 className="text-lg font-bold text-emerald-700 uppercase mb-3">Education</h3>
              <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id}>
                    <h4 className="font-bold text-sm">{edu.degree}</h4>
                    <p className="text-emerald-600 text-xs font-semibold">{edu.institution}</p>
                    <p className="text-gray-400 text-xs mt-1">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="w-2/3 space-y-8 pt-8">
          {personalInfo.summary && (
            <section>
              <h3 className="text-xl font-bold text-gray-800 uppercase border-b-2 border-emerald-100 pb-2 mb-4">About Me</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">{personalInfo.summary}</p>
            </section>
          )}

          {experience?.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-gray-800 uppercase border-b-2 border-emerald-100 pb-2 mb-4">Experience</h3>
              <div className="space-y-6">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-end mb-1">
                      <h4 className="font-bold text-lg text-emerald-800">{exp.position}</h4>
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div className="text-gray-700 font-semibold mb-2 text-sm">{exp.company}</div>
                    <p className="text-sm text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects?.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-gray-800 uppercase border-b-2 border-emerald-100 pb-2 mb-4">Projects</h3>
              <div className="space-y-6">
                {projects.map(proj => (
                  <div key={proj.id}>
                    <h4 className="font-bold text-md text-emerald-800">{proj.title}</h4>
                    <p className="text-emerald-500 text-xs mb-2">{proj.link}</p>
                    <p className="text-sm text-gray-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
