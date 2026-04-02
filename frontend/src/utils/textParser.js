export function parseResumeText(text) {
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  const data = {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      summary: '',
      title: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: []
  };

  if (lines.length > 0) {
    const nameParts = lines[0].split(' ');
    data.personalInfo.firstName = nameParts[0] || '';
    data.personalInfo.lastName = nameParts.slice(1).join(' ') || '';
  }
  
  if (lines.length > 1 && !lines[1].toLowerCase().includes('skills') && !lines[1].toLowerCase().includes('experience')) {
    data.personalInfo.title = lines[1];
  }

  let currentSection = 'summary';

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    const lowerLine = line.toLowerCase();
    
    // Detect explicit inline section like "Skills: Python, Django"
    if (lowerLine.startsWith('skills:')) {
      const skillsText = line.substring(7);
      data.skills.push(...skillsText.split(',').map(s => s.trim()).filter(Boolean));
      currentSection = 'skills';
      continue;
    }
    if (lowerLine.startsWith('experience:')) {
      const expText = line.substring(11).trim();
      if (expText) {
        data.experience.push({ id: Date.now() + i, company: expText, position: '', startDate: '', endDate: '', description: '' });
      }
      currentSection = 'experience';
      continue;
    }
    if (lowerLine.startsWith('projects:')) {
      const projText = line.substring(9).trim();
      if (projText) {
        data.projects.push({ id: Date.now() + i, title: projText, link: '', description: '' });
      }
      currentSection = 'projects';
      continue;
    }
    if (lowerLine.startsWith('education:')) {
      const eduText = line.substring(10).trim();
      if (eduText) {
        data.education.push({ id: Date.now() + i, institution: eduText, degree: '', startDate: '', endDate: '', description: '' });
      }
      currentSection = 'education';
      continue;
    }

    // Detect standalone headers
    if (lowerLine === 'experience' || lowerLine === 'work experience') { currentSection = 'experience'; continue; }
    if (lowerLine === 'education') { currentSection = 'education'; continue; }
    if (lowerLine === 'skills') { currentSection = 'skills'; continue; }
    if (lowerLine === 'projects') { currentSection = 'projects'; continue; }

    if (currentSection === 'summary') {
      if (line.includes('@') && line.includes('.')) { data.personalInfo.email = line; }
      else if (/[0-9-()+]{10,}/.test(line)) { data.personalInfo.phone = line; }
      else { data.personalInfo.summary += (data.personalInfo.summary ? ' ' : '') + line; }
    } else if (currentSection === 'skills') {
      data.skills.push(...line.split(',').map(s => s.trim()).filter(Boolean));
    } else if (currentSection === 'experience') {
      if (data.experience.length > 0) {
        data.experience[data.experience.length - 1].description += (data.experience[data.experience.length - 1].description ? '\n' : '') + line;
      } else {
        data.experience.push({ id: Date.now() + i, company: line, position: '', startDate: '', endDate: '', description: '' });
      }
    } else if (currentSection === 'projects') {
      if (data.projects.length > 0) {
        data.projects[data.projects.length - 1].description += (data.projects[data.projects.length - 1].description ? '\n' : '') + line;
      } else {
        data.projects.push({ id: Date.now() + i, title: line, link: '', description: '' });
      }
    } else if (currentSection === 'education') {
      if (data.education.length > 0) {
        data.education[data.education.length - 1].description += (data.education[data.education.length - 1].description ? '\n' : '') + line;
      } else {
        data.education.push({ id: Date.now() + i, institution: line, degree: '', startDate: '', endDate: '', description: '' });
      }
    }
  }

  // Remove duplicate skills if any
  data.skills = [...new Set(data.skills)];
  return data;
}
