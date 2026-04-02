export default function TemplateSelector({ currentTemplate, setCurrentTemplate }) {
  const atsTemplates = [
    { id: 'template1', name: 'Modern ATS (Safe)' },
    { id: 'template2', name: 'Professional Corporate' },
    { id: 'template3', name: 'Minimal Developer' },
    { id: 'template14', name: 'Single Column Timeline (Safe)' }
  ];

  const designerTemplates = [
    { id: 'template4', name: 'Photo Modern' },
    { id: 'template5', name: 'Creative Designer' },
    { id: 'template6', name: 'Executive Photo' },
    { id: 'template7', name: 'Enhancv Modern' },
    { id: 'template8', name: 'Two-Column Standard' },
    { id: 'template9', name: 'Mint Green Modern' },
    { id: 'template10', name: 'Blue & Orange Corporate' },
    { id: 'template11', name: 'Teal Software Developer' },
    { id: 'template12', name: 'Navy Blue Executive' },
    { id: 'template13', name: 'Blue Minimalist Corporate' }
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <label htmlFor="template-select" className="text-sm font-medium text-gray-700 whitespace-nowrap">
          Select Template:
        </label>
        <select
          id="template-select"
          value={currentTemplate}
          onChange={(e) => setCurrentTemplate(e.target.value)}
          className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 bg-gray-50 border border-gray-300 rounded font-medium"
        >
          <optgroup label="ATS-Safe Templates (Single Column)">
            {atsTemplates.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </optgroup>
          <optgroup label="Designer Templates (Two Column)">
            {designerTemplates.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </optgroup>
        </select>
      </div>
    </div>
  );
}
