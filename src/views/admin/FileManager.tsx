import React, { useState } from 'react';
import { Upload, Button } from '@/components/ui';
import { fileUploadProvider, FileUploadResult } from '@/services/FileUploadService';

export default function FileManager() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileUploadResult[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleFileRemove = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleUpload = async () => {
    setUploading(true);
    const results: FileUploadResult[] = [];
    for (const file of files) {
      const result = await fileUploadProvider.uploadFile(file);
      results.push(result);
    }
    setUploadedFiles(results);
    setUploading(false);
  };

  const handleRemoveUploaded = async (idx: number) => {
    const file = uploadedFiles[idx];
    if (fileUploadProvider.deleteFile) {
      await fileUploadProvider.deleteFile(file.url);
    }
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx));
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">File & Image Manager</h2>
      <Upload
        draggable
        multiple
        showList={false}
        fileList={files}
        onChange={handleFileChange}
        onFileRemove={handleFileRemove}
        accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.txt"
        className="w-full border-2 border-dashed border-primary rounded-lg p-8 bg-white dark:bg-gray-900 mb-6 text-center cursor-pointer"
      >
        <div className="text-lg text-gray-600 dark:text-gray-300">Drag & drop files here or click to select</div>
      </Upload>
      <Button variant="solid" className="mt-4" onClick={handleUpload} disabled={files.length === 0 || uploading} loading={uploading}>
        Upload Selected Files
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {uploadedFiles.length === 0 && (
          <div className="col-span-2 text-center text-gray-400">No files uploaded yet.</div>
        )}
        {uploadedFiles.map((file, idx) => {
          const isImage = file.type.startsWith('image/');
          return (
            <div key={file.url + idx} className="flex items-center gap-4 p-4 border rounded bg-gray-50 dark:bg-gray-800">
              {isImage ? (
                <img src={file.url} alt={file.name} className="w-16 h-16 object-cover rounded" />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded text-2xl">
                  📄
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{file.name}</div>
                <div className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</div>
                <div className="text-xs text-gray-400">{file.type || 'Unknown type'}</div>
                <a href={file.url} download={file.name} className="text-blue-600 hover:underline text-xs mt-1 inline-block">Download</a>
              </div>
              <Button variant="solid" className="ml-2" onClick={() => handleRemoveUploaded(idx)}>Remove</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
} 