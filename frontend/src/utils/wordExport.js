import { apiUrl } from './api';

export async function exportWordDocument(resumeData) {
  const response = await fetch(apiUrl('/api/export-word'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resumeData),
  });

  if (!response.ok) {
    let message = 'Failed to export Word document.';

    try {
      const errorData = await response.json();
      if (errorData?.detail) {
        message = errorData.detail;
      }
    } catch {
      // Keep the default message when the response body is not JSON.
    }

    throw new Error(message);
  }

  const blob = await response.blob();
  const disposition = response.headers.get('Content-Disposition') || '';
  const match = disposition.match(/filename="([^"]+)"/i);
  const filename = match?.[1] || 'Resume.docx';

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}
