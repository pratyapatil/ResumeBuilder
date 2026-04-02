import React, { useRef } from 'react';
import { Download } from 'lucide-react';
import exportPDF from '../utils/pdfExport';
import { exportWordDocument } from '../utils/wordExport';
import TemplateOne from '../templates/TemplateOne';
import TemplateTwo from '../templates/TemplateTwo';
import TemplateThree from '../templates/TemplateThree';
import TemplateFour from '../templates/TemplateFour';
import TemplateFive from '../templates/TemplateFive';
import TemplateSix from '../templates/TemplateSix';
import TemplateSeven from '../templates/TemplateSeven';
import TemplateEight from '../templates/TemplateEight';
import TemplateNine from '../templates/TemplateNine';
import TemplateTen from '../templates/TemplateTen';
import TemplateEleven from '../templates/TemplateEleven';
import TemplateTwelve from '../templates/TemplateTwelve';
import TemplateThirteen from '../templates/TemplateThirteen';
import TemplateFourteen from '../templates/TemplateFourteen';

export default function ResumePreview({ resumeData, currentTemplate }) {
  const resumeRef = useRef();

  const handleDownload = () => {
    exportPDF(resumeRef.current, resumeData.personalInfo.firstName || 'resume');
  };

  const handleDownloadWord = async () => {
    try {
      await exportWordDocument(resumeData);
    } catch (error) {
      console.error('Error generating Word doc:', error);
      alert('Failed to generate Word document: ' + error.message);
    }
  };

  const renderTemplate = () => {
    switch (currentTemplate) {
      case 'template1': return <TemplateOne data={resumeData} />;
      case 'template2': return <TemplateTwo data={resumeData} />;
      case 'template3': return <TemplateThree data={resumeData} />;
      case 'template4': return <TemplateFour data={resumeData} />;
      case 'template5': return <TemplateFive data={resumeData} />;
      case 'template6': return <TemplateSix data={resumeData} />;
      case 'template7': return <TemplateSeven data={resumeData} />;
      case 'template8': return <TemplateEight data={resumeData} />;
      case 'template9': return <TemplateNine data={resumeData} />;
      case 'template10': return <TemplateTen data={resumeData} />;
      case 'template11': return <TemplateEleven data={resumeData} />;
      case 'template12': return <TemplateTwelve data={resumeData} />;
      case 'template13': return <TemplateThirteen data={resumeData} />;
      case 'template14': return <TemplateFourteen data={resumeData} />;
      default: return <TemplateOne data={resumeData} />;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-200">
      <div className="bg-white px-4 py-3 border-b shadow-sm flex justify-between items-center z-10 shrink-0">
        <h2 className="text-lg font-semibold text-gray-800">Live Preview</h2>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            <Download size={18} /> PDF
          </button>
          <button
            onClick={handleDownloadWord}
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
          >
            <Download size={18} /> Word (.docx)
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex items-start justify-center">
        {/* Scale container to adapt dynamically to screen sizes while keeping A4 aspect ratio if desired. Here we just maintain A4 width constraints. */}
        <div 
          className="bg-white shadow-xl max-w-full origin-top"
          style={{ width: '210mm', minHeight: '297mm' }}
        >
          {/* Inner content wrapper capturing the actual resume */}
          <div ref={resumeRef} className="w-full h-full text-left print-exact-size">
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}
