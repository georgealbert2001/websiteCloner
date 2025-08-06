export interface CloneResult {
  tsxCode: string;
  previewHtml: string;
}

export async function cloneWebsite(url: string): Promise<CloneResult> {
  // Mock implementation for now
  // In a real implementation, this would call the Gemini API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        tsxCode: `// Generated TSX code for ${url}\nexport default function ClonedComponent() {\n  return <div>Cloned content from {url}</div>;\n}`,
        previewHtml: `<div style="padding: 20px; font-family: Arial, sans-serif;"><h1>Cloned Website</h1><p>This is a preview of the cloned content from: ${url}</p></div>`
      });
    }, 2000);
  });
}