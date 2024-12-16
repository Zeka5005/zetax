import React from 'react';
import { File, Trash2 } from 'lucide-react';
import { UploadedDocument } from '../../types/documents';
import { formatCurrency } from '../../utils/formatters';

interface DocumentListProps {
  documents: UploadedDocument[];
  onRemove: (index: number) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({ documents, onRemove }) => {
  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'W2':
        return 'W-2 Form';
      case '1099NEC':
        return '1099-NEC';
      case '1099INT':
        return '1099-INT';
      case '1099DIV':
        return '1099-DIV';
      default:
        return 'Other Document';
    }
  };

  const getDocumentAmount = (doc: UploadedDocument): number => {
    if (!doc.data) return 0;
    
    switch (doc.type) {
      case 'W2':
        return (doc.data as any).wagesTips || 0;
      case '1099NEC':
        return (doc.data as any).nonemployeeCompensation || 0;
      case '1099INT':
        return (doc.data as any).interestIncome || 0;
      case '1099DIV':
        return (doc.data as any).totalOrdinaryDividends || 0;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-2">
      {documents.map((doc, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
        >
          <div className="flex items-center space-x-3">
            <File className="w-5 h-5 text-blue-500" />
            <div>
              <p className="font-medium text-gray-900">{doc.file.name}</p>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-500">{getDocumentTypeLabel(doc.type)}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-500">{formatCurrency(getDocumentAmount(doc))}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-500">{(doc.file.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onRemove(index)}
            className="p-1 hover:bg-red-50 rounded-full transition-colors"
            title="Remove document"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ))}
    </div>
  );
};