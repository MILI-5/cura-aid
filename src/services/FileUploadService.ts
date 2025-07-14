// Generic file upload abstraction for extensibility

export interface FileUploadResult {
  url: string;
  name: string;
  size: number;
  type: string;
}

export interface FileUploadProvider {
  uploadFile(file: File): Promise<FileUploadResult>;
  deleteFile?(url: string): Promise<void>;
}

// Default: Local/mock implementation (returns a local object URL)
export class LocalFileUploadProvider implements FileUploadProvider {
  async uploadFile(file: File): Promise<FileUploadResult> {
    return {
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type,
    };
  }
  async deleteFile(url: string): Promise<void> {
    // No-op for local
    URL.revokeObjectURL(url);
  }
}

// Usage: Pass your provider to the FileManager or upload logic
export let fileUploadProvider: FileUploadProvider = new LocalFileUploadProvider();

export function setFileUploadProvider(provider: FileUploadProvider) {
  fileUploadProvider = provider;
} 