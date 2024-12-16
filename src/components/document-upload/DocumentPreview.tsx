import React, { useState } from 'react';
import { File, Image, X, Eye, Download } from 'lucide-react';
import { UploadedDocument } from '../../types/documents';

interface DocumentPreviewProps {
  document: UploadedDocument;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ document }) => {
  const [showPreview, setShowPreview] = useState(false);

  const isPDF = document.file.type === 'application/pdf';
  const isImage = document.file.type.startsWith('image/');

  return (
    <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-start space-x-3">
        {isPDF ? (
          <File className="w-8 h-8 text-red-500 flex-shrink-0" />
        ) : (
          <Image className="w-8 h-8 text-blue-500 flex-shrink-0" />
        )}
        
        <div className="flex-grow min-w-0">
          <h4 className="font-medium text-gray-900 truncate">
            {document.file.name}
          </h4>
          <p className="text-sm text-gray-500">
            {(document.file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowPreview(true)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            title="Preview"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => {
              const url = URL.createObjectURL(document.file);
              const a = document.createElement('a');
              a.href = url;
              a.download = document.file.name;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            title="Download"
          >
            <Download className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-medium">Document Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-8rem)]">
              {isImage ? (
                <img
                  src={document.preview}
                  alt="Document preview"
                  className="max-w-full h-auto"
                />
              ) : (
                <iframe
                  src={document.preview}
                  className="w-full h-[70vh]"
                  title="Document preview"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};