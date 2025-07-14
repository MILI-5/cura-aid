import React, { useState, useRef } from 'react';

const defaultTheme = {
  primary: '#0ea5e9',
  background: '#ffffff',
  text: '#22223b',
};

function ThemeBuilder() {
  const [theme, setTheme] = useState(defaultTheme);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme({ ...theme, [e.target.name]: e.target.value });
  };

  const handleExport = () => {
    const dataStr = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(theme, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'cura-theme.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        setTheme({ ...theme, ...imported });
      } catch {
        alert('Invalid theme file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Custom Theme Builder</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <label className="flex flex-col gap-2">
          <span className="font-medium">Primary Color</span>
          <input type="color" name="primary" value={theme.primary} onChange={handleColorChange} />
          <input type="text" name="primary" value={theme.primary} onChange={handleColorChange} className="border rounded px-2 py-1" />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-medium">Background Color</span>
          <input type="color" name="background" value={theme.background} onChange={handleColorChange} />
          <input type="text" name="background" value={theme.background} onChange={handleColorChange} className="border rounded px-2 py-1" />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-medium">Text Color</span>
          <input type="color" name="text" value={theme.text} onChange={handleColorChange} />
          <input type="text" name="text" value={theme.text} onChange={handleColorChange} className="border rounded px-2 py-1" />
        </label>
      </div>
      <div className="flex gap-4 mb-8">
        <button className="px-4 py-2 rounded bg-primary text-white" onClick={handleExport}>Export Theme</button>
        <button className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700" onClick={() => fileInputRef.current?.click()}>Import Theme</button>
        <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImport} />
      </div>
      <div className="rounded-lg border p-8" style={{ background: theme.background, color: theme.text }}>
        <h3 className="text-xl font-bold mb-2" style={{ color: theme.primary }}>Live Preview</h3>
        <p>This is a preview of your theme. Change the colors above to see the effect instantly.</p>
        <button className="mt-4 px-4 py-2 rounded" style={{ background: theme.primary, color: theme.background }}>Primary Button</button>
      </div>
    </div>
  );
}

export default ThemeBuilder; 