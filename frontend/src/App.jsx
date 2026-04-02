import React, { useState } from 'react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import TemplateSelector from './components/TemplateSelector';

const initialData = {
  personalInfo: {
    firstName: 'Pratap',
    lastName: 'Patil',
    email: 'pratappatilmh24@gmail.com',
    phone: '+91 86 3773 1909',
    address: 'Pune, India',
    linkedin: 'linkedin.com/in/pratap-patil-269bb625b',
    github: '',
    portfolio: '',
    title: 'Backend Developer',
    summary: 'Results-driven Backend Developer with expertise in Python, Django, and REST API development. Experienced in building scalable backend systems, real-time communication platforms, and cloud-based applications. Strong background in asynchronous processing, WebSocket-based systems, and media delivery infrastructure. Focused on performance, reliability, and building maintainable backend architectures.',
    photo: '',
  },
  experience: [
    {
      id: 1,
      company: 'EC Infosolutions Pvt Ltd, Pune',
      position: 'Software Engineer',
      startDate: 'Apr 2024',
      endDate: 'Present',
      description: '• Develop scalable backend systems using Django REST Framework for enterprise applications.\n• Built high-performance REST APIs supporting large-scale users.\n• Implemented asynchronous task processing using Celery and Redis.\n• Integrated AWS S3 and CloudFront for secure media storage and delivery.\n• Implemented OAuth authentication including Google and Apple sign-in.\n• Developed structured logging and monitoring for backend services.',
    },
    {
      id: 2,
      company: 'Mobilotte Technologies, Pune',
      position: 'Software Engineer',
      startDate: 'May 2023',
      endDate: 'Feb 2024',
      description: '• Developed scalable and maintainable application components.\n• Integrated new technologies to enhance existing platforms.\n• Reduced development effort by creating reusable modules.',
    },
    {
      id: 3,
      company: 'Hefshine Software, Pune',
      position: 'Trainee Fullstack Developer',
      startDate: 'Oct 2022',
      endDate: 'May 2023',
      description: '• Completed full-stack development training and contributed to projects using Java, Spring, Angular, and MySQL.',
    }
  ],
  education: [
    {
      id: 1,
      institution: 'Swami Ramanand Teerth Marathwada University',
      degree: 'Bachelor of Science (Computer Science)',
      startDate: '2018',
      endDate: '2022',
      description: 'CGPA: 9.31',
    },
    {
      id: 2,
      institution: 'Yashwant Junior College',
      degree: '12th',
      startDate: '',
      endDate: '2018',
      description: '',
    },
    {
      id: 3,
      institution: 'Mahatma Phule Vidyalaya',
      degree: '10th',
      startDate: '',
      endDate: '2016',
      description: '',
    }
  ],
  skills: [
    'Python', 'Django', 'Django REST Framework', 'Celery', 'Redis', 'Django Channels', 'WebSockets',
    'PostgreSQL', 'Pandas', 'QRCode (Python)', 'AWS S3', 'AWS CloudFront', 'DigitalOcean',
    'Wistia API', 'Firebase Admin SDK', 'Stripe API', 'OAuth2', 'Google Sign-In', 'Apple Sign-In',
    'Python Logging', 'Backend System Design', 'Java', 'Spring', 'Angular', 'MySQL'
  ],
  projects: [
    {
      id: 1,
      title: 'Knorr-Bremse – Real-Time Collaborative Whiteboard',
      link: 'In Development',
      description: '• Implemented WebSocket-based real-time synchronization for collaborative drawing.\n• Built session-based multi-user whiteboard interaction system.\n• Developed real-time chat for users inside collaboration sessions.\n• Designed backend APIs using Django REST Framework.',
    },
    {
      id: 2,
      title: 'Soul33 – Digital Wellness Platform',
      link: '',
      description: '• Built Django + DRF backend for personalized meditation and wellness application.\n• Implemented real-time chat using Django Channels and WebSockets.\n• Integrated Stripe subscriptions and AWS S3 media streaming.\n• Used Celery + Redis for background task processing.',
    },
    {
      id: 3,
      title: 'Malibu Hindu Temple – QR Registration System',
      link: '',
      description: '• Developed digital membership registration and nomination system.\n• Generated unique QR codes for identity verification.\n• Implemented admin dashboards and bulk user import using Pandas.',
    },
    {
      id: 4,
      title: 'EliteCRM – CRM for User Management',
      link: '',
      description: '• Built CRM workflows with advanced filtering and analytics dashboards.\n• Implemented CSV data import pipelines using Pandas.',
    },
    {
      id: 5,
      title: 'Flairish – Scalable Learning Platform',
      link: '',
      description: '• Developed backend supporting video streaming and notifications.\n• Integrated Wistia API and Firebase push notifications.\n• Implemented Redis + Celery background processing.',
    }
  ],
  certifications: [
    {
      id: 1,
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon',
      date: '2023'
    }
  ],
  languages: ['English', 'Hindi'],
  customSections: [
    {
      id: 1,
      title: 'Passions (Custom)',
      items: [
        {
          id: 1,
          header: 'Emerging Technologies',
          description: 'Keen interest in exploring and utilizing emerging technologies to drive efficiency.'
        }
      ]
    }
  ],
  layout: [
    { id: 'summary', name: 'Professional Summary', visible: true },
    { id: 'experience', name: 'Experience', visible: true },
    { id: 'education', name: 'Education', visible: true },
    { id: 'projects', name: 'Projects', visible: true },
    { id: 'certifications', name: 'Courses & Certifications', visible: true },
    { id: 'skills', name: 'Skills', visible: true },
    { id: 'languages', name: 'Languages', visible: true },
    { id: 'custom', name: 'Custom Sections', visible: true }
  ]
};

function App() {
  const [resumeData, setResumeData] = useState(initialData);
  const [currentTemplate, setCurrentTemplate] = useState('template14');
  const [activeTab, setActiveTab] = useState('form'); // 'form', 'paste', 'layout', 'ai'

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center z-10">
        <div>
          <h1 className="text-2xl font-bold text-indigo-600">ResumeCraft</h1>
          <p className="text-sm text-gray-500">Professional Resume Builder</p>
        </div>
        <TemplateSelector currentTemplate={currentTemplate} setCurrentTemplate={setCurrentTemplate} />
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel - Editor */}
        <section className="w-full lg:w-1/2 flex flex-col bg-white border-r">
          <div className="flex border-b">
            <button
              className={`flex-1 py-3 text-sm font-medium ${activeTab === 'form' ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('form')}
            >
              Fill Form
            </button>
            <button
              className={`flex-1 py-3 text-sm font-medium ${activeTab === 'layout' ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('layout')}
            >
              Layout Options
            </button>
            <button
              className={`flex-1 py-3 text-sm font-medium ${activeTab === 'paste' ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('paste')}
            >
              Paste Resume
            </button>
            <button
              className={`flex-1 py-3 text-sm font-medium ${activeTab === 'ai' ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('ai')}
            >
              AI Analysis
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <ResumeForm 
              resumeData={resumeData} 
              setResumeData={setResumeData} 
              activeTab={activeTab}
            />
          </div>
        </section>

        {/* Right Panel - Preview */}
        <section className="w-full lg:w-1/2 bg-gray-100 flex flex-col h-full overflow-hidden">
          <ResumePreview 
            resumeData={resumeData} 
            currentTemplate={currentTemplate} 
          />
        </section>
      </main>
    </div>
  );
}

export default App;
