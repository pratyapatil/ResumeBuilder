import React, { useState } from 'react';
import { parseResumeText } from '../utils/textParser';
import { apiUrl } from '../utils/api';
import { Sparkles, Target, ListChecks, ArrowRight, Loader2, Zap } from 'lucide-react';

export default function ResumeForm({ resumeData, setResumeData, activeTab }) {
  const [pasteText, setPasteText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysisStatus, setAnalysisStatus] = useState('idle'); // 'idle', 'analyzing', 'completed', 'error'
  const [analysisResult, setAnalysisResult] = useState(null);
  const [streamingText, setStreamingText] = useState("");
  const [analysisError, setAnalysisError] = useState('');

  const createItemId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  };

  const handleChange = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setResumeData(prev => {
      const newArray = prev[section] ? [...prev[section]] : [];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [section]: newArray };
    });
  };

  const addArrayItem = (section, template) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), { id: createItemId(), ...template }]
    }));
  };

  const removeArrayItem = (section, index) => {
    setResumeData(prev => {
      const newArray = prev[section] ? [...prev[section]] : [];
      newArray.splice(index, 1);
      return { ...prev, [section]: newArray };
    });
  };

  const moveArrayItem = (section, index, direction) => {
    setResumeData(prev => {
      const newArray = prev[section] ? [...prev[section]] : [];
      if (direction === 'up' && index > 0) {
        [newArray[index - 1], newArray[index]] = [newArray[index], newArray[index - 1]];
      } else if (direction === 'down' && index < newArray.length - 1) {
        [newArray[index + 1], newArray[index]] = [newArray[index], newArray[index + 1]];
      }
      return { ...prev, [section]: newArray };
    });
  };

  const addCustomSection = () => {
    setResumeData(prev => ({
      ...prev,
      customSections: [...(prev.customSections || []), { id: createItemId(), title: '', items: [] }]
    }));
  };

  const removeCustomSection = (index) => {
    setResumeData(prev => {
      const newArray = [...(prev.customSections || [])];
      newArray.splice(index, 1);
      return { ...prev, customSections: newArray };
    });
  };

  const moveCustomSection = (index, direction) => {
    setResumeData(prev => {
      const newArray = [...(prev.customSections || [])];
      if (direction === 'up' && index > 0) {
        [newArray[index - 1], newArray[index]] = [newArray[index], newArray[index - 1]];
      } else if (direction === 'down' && index < newArray.length - 1) {
        [newArray[index + 1], newArray[index]] = [newArray[index], newArray[index + 1]];
      }
      return { ...prev, customSections: newArray };
    });
  };

  const handleCustomSectionChange = (index, value) => {
    setResumeData(prev => {
      const newArray = [...(prev.customSections || [])];
      newArray[index] = { ...newArray[index], title: value };
      return { ...prev, customSections: newArray };
    });
  };

  const addCustomItem = (sectionIndex) => {
    setResumeData(prev => {
      const newArray = [...(prev.customSections || [])];
      newArray[sectionIndex].items = [...(newArray[sectionIndex].items || []), { id: createItemId(), header: '', subHeader: '', date: '', description: '' }];
      return { ...prev, customSections: newArray };
    });
  };

  const removeCustomItem = (sectionIndex, itemIndex) => {
    setResumeData(prev => {
      const newArray = [...(prev.customSections || [])];
      newArray[sectionIndex].items.splice(itemIndex, 1);
      return { ...prev, customSections: newArray };
    });
  };

  const moveCustomItem = (sectionIndex, itemIndex, direction) => {
    setResumeData(prev => {
      const newArray = [...(prev.customSections || [])];
      const items = newArray[sectionIndex].items;
      if (direction === 'up' && itemIndex > 0) {
        [items[itemIndex - 1], items[itemIndex]] = [items[itemIndex], items[itemIndex - 1]];
      } else if (direction === 'down' && itemIndex < items.length - 1) {
        [items[itemIndex + 1], items[itemIndex]] = [items[itemIndex], items[itemIndex + 1]];
      }
      return { ...prev, customSections: newArray };
    });
  };

  const handleCustomItemChange = (sectionIndex, itemIndex, field, value) => {
    setResumeData(prev => {
      const newArray = [...(prev.customSections || [])];
      newArray[sectionIndex].items[itemIndex] = { ...newArray[sectionIndex].items[itemIndex], [field]: value };
      return { ...prev, customSections: newArray };
    });
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(s => s.trim());
    setResumeData(prev => ({ ...prev, skills }));
  };

  const handlePasteSubmit = () => {
    const parsedData = parseResumeText(pasteText);
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...parsedData.personalInfo },
      experience: parsedData.experience.length ? parsedData.experience : prev.experience,
      education: parsedData.education.length ? parsedData.education : prev.education,
      skills: parsedData.skills.length ? parsedData.skills : prev.skills,
      projects: parsedData.projects.length ? parsedData.projects : prev.projects
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('personalInfo', 'photo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;

    setAnalysisStatus('analyzing');
    setAnalysisResult(null);
    setStreamingText("");
    setAnalysisError('');

    try {
      const response = await fetch(apiUrl('/api/analyze-resume-stream'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume_data: resumeData,
          job_description: jobDescription
        }),
      });

      if (!response.ok) throw new Error('Analysis failed');
      if (!response.body) throw new Error('Analysis stream is unavailable');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let bufferedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        bufferedText += decoder.decode(value, { stream: true });
        const lines = bufferedText.split('\n');
        bufferedText = lines.pop() || '';
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const payload = line.slice(6).trim();
            if (!payload) {
              continue;
            }

            const data = JSON.parse(payload);
            if (data.chunk) {
              setStreamingText(prev => prev + data.chunk);
            }
            if (data.done) {
              try {
                const parsed = JSON.parse(data.full_response);
                setAnalysisResult(parsed);
                setAnalysisStatus('completed');
              } catch (e) {
                console.error("Failed to parse final JSON", e);
                setAnalysisStatus('error');
              }
            }
            if (data.error) {
              throw new Error(data.error);
            }
          }
        }
      }

      const finalChunk = bufferedText.trim();
      if (finalChunk.startsWith('data: ')) {
        const data = JSON.parse(finalChunk.slice(6).trim());
        if (data.chunk) {
          setStreamingText(prev => prev + data.chunk);
        }
        if (data.done) {
          try {
            const parsed = JSON.parse(data.full_response);
            setAnalysisResult(parsed);
            setAnalysisStatus('completed');
          } catch (e) {
            console.error("Failed to parse final JSON", e);
            setAnalysisStatus('error');
          }
        }
        if (data.error) {
          throw new Error(data.error);
        }
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisError(error.message || 'Analysis failed');
      setAnalysisStatus('error');
    }
  };


  const renderAnalysisContent = () => {
    if (analysisStatus === 'idle') {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <Zap className="text-indigo-600" size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Ready for Intelligence?</h3>
          <p className="text-slate-500 max-w-sm">
            Paste a job description above and click "Analyze Match" to get AI-powered insights, ATS scoring, and bullet point improvements.
          </p>
        </div>
      );
    }

    if (analysisStatus === 'analyzing') {
      return (
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center p-8 text-center animate-pulse">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h3 className="text-lg font-semibold text-slate-700">AI is analyzing your resume...</h3>
            <p className="text-slate-400">This may take a minute on CPU-based systems.</p>
          </div>
          
          {/* Live Reasoning Box */}
          <div className="bg-slate-900 rounded-xl p-6 shadow-inner border border-slate-700">
            <div className="flex items-center gap-2 mb-3 text-emerald-400 font-mono text-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
              <span>LIVE REASONING</span>
            </div>
            <div className="font-mono text-slate-300 text-sm whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
              {streamingText || "Waiting for AI to start thinking..."}
              <span className="inline-block w-2 h-4 bg-indigo-500 ml-1 animate-pulse"></span>
            </div>
          </div>
        </div>
      );
    }

    if (analysisStatus === 'completed' && analysisResult) {
      return (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100 shadow-sm flex flex-col items-center justify-center">
              <Target className="w-8 h-8 text-indigo-500 mb-2" />
              <span className="text-sm text-indigo-600 font-bold uppercase tracking-wider">ATS Score</span>
              <div className="text-4xl font-black text-indigo-900 mt-1">{analysisResult.ats_score}%</div>
            </div>
            
            <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <ListChecks className="w-5 h-5 text-purple-500" />
                <span className="font-bold text-gray-800">Missing Skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysisResult.missing_skills.map((skill, i) => (
                  <span key={i} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold border border-purple-100 italic">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Improvement Suggestions
            </h4>
            <ul className="space-y-3">
              {analysisResult.improvements.map((improvement, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed border-b border-gray-50 pb-2 last:border-0">
                  <div className="mt-1 w-5 h-5 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-indigo-600">{i + 1}</span>
                  </div>
                  {improvement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    if (analysisStatus === 'error') {
      return (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-800">
          <h4 className="font-bold mb-2">Analysis failed</h4>
          <p className="text-sm leading-relaxed">
            {analysisError || 'The AI analysis request could not be completed.'}
          </p>
        </div>
      );
    }
  };

  if (activeTab === 'ai') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-indigo-600" />
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            AI Resume Intelligence
          </h3>
        </div>
        
        <p className="text-sm text-gray-500">
          Leverage AI to check your ATS compatibility and get detailed suggestions based on a specific job description.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-semibold">Job Description</label>
            <textarea
              className="w-full h-48 p-4 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 border-gray-200"
              placeholder="Paste the target job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            ></textarea>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={analysisStatus === 'analyzing'}
            className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
              analysisStatus === 'analyzing'
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:scale-95'
            }`}
          >
            {analysisStatus === 'analyzing' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                Analyze Match
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {renderAnalysisContent()}
        </div>
      </div>
    );
  }

  if (activeTab === 'paste') {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-2">Paste Resume Text</h3>
        <p className="text-sm text-gray-500 mb-4">Paste your unstructured resume text below, and we will try to extract the details.</p>
        <textarea
          className="w-full h-96 p-4 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Paste resume text here..."
          value={pasteText}
          onChange={(e) => setPasteText(e.target.value)}
        ></textarea>
        <button
          onClick={handlePasteSubmit}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Parse & Apply
        </button>
      </div>
    );
  }

  if (activeTab === 'layout') {
    const layout = resumeData.layout || [];

    const moveLayoutItem = (index, direction) => {
      setResumeData(prev => {
        const newLayout = [...(prev.layout || [])];
        if (direction === 'up' && index > 0) {
          [newLayout[index - 1], newLayout[index]] = [newLayout[index], newLayout[index - 1]];
        } else if (direction === 'down' && index < newLayout.length - 1) {
          [newLayout[index + 1], newLayout[index]] = [newLayout[index], newLayout[index + 1]];
        }
        return { ...prev, layout: newLayout };
      });
    };

    const toggleVisibility = (index) => {
      setResumeData(prev => {
        const newLayout = [...(prev.layout || [])];
        newLayout[index].visible = !newLayout[index].visible;
        return { ...prev, layout: newLayout };
      });
    };

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Rearrange Resume Sections</h3>
          <p className="text-sm text-gray-500 mb-6">Drag and drop or use arrows to change the global order of your resume sections. You can also hide sections entirely.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4 space-y-3">
          {layout.map((item, index) => (
            <div key={item.id} className={`flex items-center justify-between p-3 border rounded border-gray-200 transition-colors ${item.visible ? 'bg-gray-50' : 'bg-gray-100 opacity-60'}`}>
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">{item.name}</span>
                {!item.visible && <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded">HIDDEN</span>}
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => toggleVisibility(index)} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-1 rounded">
                  {item.visible ? 'Hide' : 'Show'}
                </button>
                <div className="flex bg-white shadow-sm border rounded">
                  <button onClick={() => moveLayoutItem(index, 'up')} disabled={index === 0} className="px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-black disabled:opacity-30 disabled:hover:bg-transparent border-r">↑</button>
                  <button onClick={() => moveLayoutItem(index, 'down')} disabled={index === layout.length - 1} className="px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-black disabled:opacity-30 disabled:hover:bg-transparent">↓</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-sm mt-8 border border-blue-200">
          <strong>Note:</strong> Rearranging applies mainly to Single-Column templates (like Template 1, 14) and block-flow templates. Highly structured Two-Column templates may lock some items natively.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Personal Info */}
      <section>
        <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-700">Personal Information</h3>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-gray-50 border whitespace-pre-wrap"
              value={resumeData.personalInfo.firstName} onChange={e => handleChange('personalInfo', 'firstName', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-gray-50 border whitespace-pre-wrap"
              value={resumeData.personalInfo.lastName} onChange={e => handleChange('personalInfo', 'lastName', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-gray-50 border whitespace-pre-wrap"
              value={resumeData.personalInfo.title} onChange={e => handleChange('personalInfo', 'title', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-gray-50 border whitespace-pre-wrap"
              value={resumeData.personalInfo.email} onChange={e => handleChange('personalInfo', 'email', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-gray-50 border whitespace-pre-wrap"
              value={resumeData.personalInfo.phone} onChange={e => handleChange('personalInfo', 'phone', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address / Location</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-gray-50 border whitespace-pre-wrap"
              value={resumeData.personalInfo.address} onChange={e => handleChange('personalInfo', 'address', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-gray-50 border whitespace-pre-wrap"
              value={resumeData.personalInfo.linkedin} onChange={e => handleChange('personalInfo', 'linkedin', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">GitHub</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-gray-50 border whitespace-pre-wrap"
              value={resumeData.personalInfo.github} onChange={e => handleChange('personalInfo', 'github', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Portfolio Website</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-gray-50 border whitespace-pre-wrap"
              value={resumeData.personalInfo.portfolio || ''} onChange={e => handleChange('personalInfo', 'portfolio', e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Photo (Required for some templates)</label>
            <input type="file" accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              onChange={handlePhotoUpload} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
            <textarea rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-gray-50 border whitespace-pre-wrap"
              value={resumeData.personalInfo.summary} onChange={e => handleChange('personalInfo', 'summary', e.target.value)} />
          </div>
        </div>
      </section>

      {/* Experience */}
      <section>
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Experience</h3>
          <button onClick={() => addArrayItem('experience', { company: '', position: '', startDate: '', endDate: '', description: '' })} className="text-sm text-indigo-600 font-medium">+ Add Item</button>
        </div>
        <div className="space-y-6">
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="p-4 border rounded-md bg-gray-50 relative">
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => moveArrayItem('experience', index, 'up')} disabled={index === 0} className="text-gray-400 hover:text-indigo-600 disabled:opacity-30">↑</button>
                <button onClick={() => moveArrayItem('experience', index, 'down')} disabled={index === resumeData.experience.length - 1} className="text-gray-400 hover:text-indigo-600 disabled:opacity-30">↓</button>
                <button onClick={() => removeArrayItem('experience', index)} className="text-red-500 font-bold hover:text-red-700 ml-2">&times;</button>
              </div>
              <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700">Company</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-white border whitespace-pre-wrap"
                    value={exp.company} onChange={e => handleArrayChange('experience', index, 'company', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Position</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-white border whitespace-pre-wrap"
                    value={exp.position} onChange={e => handleArrayChange('experience', index, 'position', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Start Date</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-white border whitespace-pre-wrap"
                    value={exp.startDate} onChange={e => handleArrayChange('experience', index, 'startDate', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">End Date</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-white border whitespace-pre-wrap"
                    value={exp.endDate} onChange={e => handleArrayChange('experience', index, 'endDate', e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-700">Description</label>
                  <textarea rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-white border whitespace-pre-wrap"
                    value={exp.description} onChange={e => handleArrayChange('experience', index, 'description', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Education</h3>
          <button onClick={() => addArrayItem('education', { institution: '', degree: '', startDate: '', endDate: '', description: '' })} className="text-sm text-indigo-600 font-medium">+ Add Item</button>
        </div>
        <div className="space-y-6">
          {resumeData.education.map((edu, index) => (
            <div key={edu.id} className="p-4 border rounded-md bg-gray-50 relative">
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => moveArrayItem('education', index, 'up')} disabled={index === 0} className="text-gray-400 hover:text-indigo-600 disabled:opacity-30">↑</button>
                <button onClick={() => moveArrayItem('education', index, 'down')} disabled={index === resumeData.education.length - 1} className="text-gray-400 hover:text-indigo-600 disabled:opacity-30">↓</button>
                <button onClick={() => removeArrayItem('education', index)} className="text-red-500 font-bold hover:text-red-700 ml-2">&times;</button>
              </div>
              <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700">Institution</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-white border whitespace-pre-wrap"
                    value={edu.institution} onChange={e => handleArrayChange('education', index, 'institution', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Degree</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-white border whitespace-pre-wrap"
                    value={edu.degree} onChange={e => handleArrayChange('education', index, 'degree', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Start Date</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-white border whitespace-pre-wrap"
                    value={edu.startDate} onChange={e => handleArrayChange('education', index, 'startDate', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">End Date</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-white border whitespace-pre-wrap"
                    value={edu.endDate} onChange={e => handleArrayChange('education', index, 'endDate', e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-700">Description</label>
                  <textarea rows={2} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-white border whitespace-pre-wrap"
                    value={edu.description} onChange={e => handleArrayChange('education', index, 'description', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section>
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Certifications</h3>
          <button onClick={() => addArrayItem('certifications', { name: '', issuer: '', date: '' })} className="text-sm text-indigo-600 font-medium">+ Add Item</button>
        </div>
        <div className="space-y-6">
          {resumeData.certifications?.map((cert, index) => (
            <div key={cert.id || index} className="p-4 border rounded-md bg-gray-50 relative">
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => moveArrayItem('certifications', index, 'up')} disabled={index === 0} className="text-gray-400 hover:text-indigo-600 disabled:opacity-30">↑</button>
                <button onClick={() => moveArrayItem('certifications', index, 'down')} disabled={index === (resumeData.certifications?.length || 0) - 1} className="text-gray-400 hover:text-indigo-600 disabled:opacity-30">↓</button>
                <button onClick={() => removeArrayItem('certifications', index)} className="text-red-500 font-bold hover:text-red-700 ml-2">&times;</button>
              </div>
              <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700">Certification Name</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-white border"
                    value={cert.name} onChange={e => handleArrayChange('certifications', index, 'name', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Issuer</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-white border"
                    value={cert.issuer} onChange={e => handleArrayChange('certifications', index, 'issuer', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Date/Year</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-white border"
                    value={cert.date} onChange={e => handleArrayChange('certifications', index, 'date', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section>
        <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-700">Languages</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Comma-separated languages</label>
          <input type="text" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-gray-50 border whitespace-pre-wrap"
            value={(resumeData.languages || []).join(', ')} onChange={e => setResumeData(prev => ({ ...prev, languages: e.target.value.split(',').map(s => s.trim()) }))} />
        </div>
      </section>

      {/* Skills */}
      <section>
        <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-700">Skills</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Comma-separated skills</label>
          <input type="text" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-gray-50 border whitespace-pre-wrap"
            value={resumeData.skills.join(', ')} onChange={handleSkillsChange} />
        </div>
      </section>

      {/* Projects */}
      <section>
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Projects</h3>
          <button onClick={() => addArrayItem('projects', { title: '', link: '', description: '' })} className="text-sm text-indigo-600 font-medium">+ Add Item</button>
        </div>
        <div className="space-y-6">
          {resumeData.projects?.map((proj, index) => (
            <div key={proj.id} className="p-4 border rounded-md bg-gray-50 relative">
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => moveArrayItem('projects', index, 'up')} disabled={index === 0} className="text-gray-400 hover:text-indigo-600 disabled:opacity-30">↑</button>
                <button onClick={() => moveArrayItem('projects', index, 'down')} disabled={index === (resumeData.projects?.length || 0) - 1} className="text-gray-400 hover:text-indigo-600 disabled:opacity-30">↓</button>
                <button onClick={() => removeArrayItem('projects', index)} className="text-red-500 font-bold hover:text-red-700 ml-2">&times;</button>
              </div>
              <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700">Project Title</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-white border whitespace-pre-wrap"
                    value={proj.title} onChange={e => handleArrayChange('projects', index, 'title', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Link</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-white border whitespace-pre-wrap"
                    value={proj.link} onChange={e => handleArrayChange('projects', index, 'link', e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-700">Description</label>
                  <textarea rows={2} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-white border whitespace-pre-wrap"
                    value={proj.description} onChange={e => handleArrayChange('projects', index, 'description', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Sections */}
      <section>
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Custom Sections</h3>
          <button onClick={addCustomSection} className="text-sm text-indigo-600 font-medium">+ Add Section</button>
        </div>
        <div className="space-y-8">
          {resumeData.customSections?.map((section, sectionIndex) => (
            <div key={section.id || sectionIndex} className="p-4 border border-indigo-200 rounded-md bg-indigo-50/30 relative">
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => moveCustomSection(sectionIndex, 'up')} disabled={sectionIndex === 0} className="text-gray-400 hover:text-indigo-600 disabled:opacity-30">↑</button>
                <button onClick={() => moveCustomSection(sectionIndex, 'down')} disabled={sectionIndex === (resumeData.customSections?.length || 0) - 1} className="text-gray-400 hover:text-indigo-600 disabled:opacity-30">↓</button>
                <button onClick={() => removeCustomSection(sectionIndex)} className="text-red-500 font-bold hover:text-red-700 ml-2">&times;</button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                <input type="text" className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 bg-white border"
                  value={section.title} onChange={e => handleCustomSectionChange(sectionIndex, e.target.value)} placeholder="e.g. Passions, Volunteering, Awards" />
              </div>

              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-semibold text-gray-700">Items</h4>
                <button onClick={() => addCustomItem(sectionIndex)} className="text-xs text-indigo-600 font-medium">+ Add Item</button>
              </div>

              <div className="space-y-4 pl-4 border-l-2 border-indigo-100">
                {section.items?.map((item, itemIndex) => (
                  <div key={item.id || itemIndex} className="p-3 border rounded-md bg-white relative">
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button onClick={() => moveCustomItem(sectionIndex, itemIndex, 'up')} disabled={itemIndex === 0} className="text-gray-400 hover:text-indigo-600 disabled:opacity-30">↑</button>
                      <button onClick={() => moveCustomItem(sectionIndex, itemIndex, 'down')} disabled={itemIndex === (section.items?.length || 0) - 1} className="text-gray-400 hover:text-indigo-600 disabled:opacity-30">↓</button>
                      <button onClick={() => removeCustomItem(sectionIndex, itemIndex)} className="text-red-500 font-bold hover:text-red-700 ml-2">&times;</button>
                    </div>
                    <div className="grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-700">Header / Title</label>
                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-1.5 bg-gray-50 border"
                          value={item.header} onChange={e => handleCustomItemChange(sectionIndex, itemIndex, 'header', e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700">Subheader / Role</label>
                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-1.5 bg-gray-50 border"
                          value={item.subHeader} onChange={e => handleCustomItemChange(sectionIndex, itemIndex, 'subHeader', e.target.value)} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-gray-700">Date / Location</label>
                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-1.5 bg-gray-50 border"
                          value={item.date} onChange={e => handleCustomItemChange(sectionIndex, itemIndex, 'date', e.target.value)} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-gray-700">Description</label>
                        <textarea rows={2} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-1.5 bg-gray-50 border whitespace-pre-wrap"
                          value={item.description} onChange={e => handleCustomItemChange(sectionIndex, itemIndex, 'description', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="pt-8"></div>
    </div>
  );
}
