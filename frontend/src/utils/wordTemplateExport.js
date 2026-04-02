import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

/**
 * Fetches the raw Word template, unzips it, injects ResumeData, and triggers a download.
 * @param {Object} resumeData - Standard frontend resume state object
 */
export async function exportWordTemplate(resumeData) {
  try {
    // 1. Fetch the static template.docx from the public folder
    const response = await fetch('/template.docx');
    if (!response.ok) {
      throw new Error("Could not find '/template.docx' in the public folder. Please place your template there!");
    }
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();

    // 2. Unzip the content of the file
    const zip = new PizZip(arrayBuffer);

    // 3. Initialize Docxtemplater
    // paragraphLoop: true ensures {#experience} ... {/experience} loops clone whole paragraphs
    // linebreaks: true ensures \n characters create actual word newlines
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // 4. Map the frontend state into clean variable names specifically matching your word placeholders
    const formattedData = {
      name: `${resumeData.personalInfo?.firstName || ''} ${resumeData.personalInfo?.lastName || ''}`.trim(),
      job_title: resumeData.personalInfo?.title || '',
      email: resumeData.personalInfo?.email || '',
      phone: resumeData.personalInfo?.phone || '',
      address: resumeData.personalInfo?.address || '',
      summary: resumeData.personalInfo?.summary || '',
      
      // Loops handle arrays of objects automatically for anything inside {#experience} {/experience} tags
      experience: resumeData.experience || [],
      education: resumeData.education || [],
      
      // Since skills is just an array of strings like ["JavaScript", "React"], 
      // we join it into a comma-separated string for simplicity in the word template.
      skills: resumeData.skills?.join(', ') || ''
    };

    // 5. Render/Inject the data into the Word placeholders
    doc.render(formattedData);

    // 6. Generate and save the final `.docx`
    const out = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    
    // 7. Trigger download using file-saver
    const finalFilename = formattedData.name ? `${formattedData.name.replace(/\s+/g, '_')}_Resume.docx` : 'Resume.docx';
    saveAs(out, finalFilename);

  } catch (error) {
    console.error("Docxtemplater error:", error);
    throw error;
  }
}
