import React, { useState } from 'react';
import { ClipboardCheck, FileText, User, Users, Pencil, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { UploadedDocument } from '../../types/documents';
import { formatSSN } from '../../utils/validation/ssnValidation';
import { getStateName } from '../../utils/constants/states';
import { getFilingStatusLabel } from '../../utils/constants/filingStatus';

interface ReviewSubmitSectionProps {
  personalInfo: any;
  hasDependents: boolean;
  dependents: any[];
  documents: UploadedDocument[];
  onSubmit: () => Promise<void>;
  onBack: () => void;
  onEdit: (section: 'personal' | 'dependents' | 'income') => void;
  onRemoveDocument: (index: number) => void;
  onRemoveDependent: (index: number) => void;
}

export const ReviewSubmitSection: React.FC<ReviewSubmitSectionProps> = ({
  personalInfo,
  hasDependents,
  dependents,
  documents,
  onSubmit,
  onBack,
  onEdit,
  onRemoveDocument,
  onRemoveDependent,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit();
      setSubmitSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Error submitting documents');
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Documents Successfully Submitted!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for submitting your tax documents. We'll process them and update your tax return accordingly.
          You'll receive a confirmation email shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <ClipboardCheck className="w-5 h-5 mr-2" />
          Review Your Information
        </h2>

        {/* Personal Information Summary */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg relative group">
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit('personal')}
              className="p-1 text-gray-500 hover:text-primary-500"
              title="Edit personal information"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-lg font-medium mb-3 flex items-center">
            <User className="w-4 h-4 mr-2" />
            Personal Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Name:</strong> {personalInfo.firstName} {personalInfo.lastName}</p>
              <p><strong>SSN:</strong> {formatSSN(personalInfo.ssn)}</p>
              <p><strong>Filing Status:</strong> {getFilingStatusLabel(personalInfo.filingStatus)}</p>
            </div>
            <div>
              <p><strong>Email:</strong> {personalInfo.email}</p>
              <p><strong>Phone:</strong> {personalInfo.phone}</p>
              <p><strong>State:</strong> {getStateName(personalInfo.state)}</p>
            </div>
          </div>
        </div>

        {/* Dependents Summary */}
        {hasDependents && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg relative group">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit('dependents')}
                className="p-1 text-gray-500 hover:text-primary-500 mr-2"
                title="Edit dependents"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-lg font-medium mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Dependents ({dependents.length})
            </h3>
            <div className="space-y-3">
              {dependents.map((dependent, index) => (
                <div key={index} className="text-sm relative group/dependent p-2 rounded-md hover:bg-gray-100">
                  <div className="absolute right-2 top-2 opacity-0 group-hover/dependent:opacity-100 transition-opacity">
                    <button
                      onClick={() => onRemoveDependent(index)}
                      className="p-1 text-red-500 hover:text-red-600"
                      title="Remove dependent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p><strong>Name:</strong> {dependent.firstName} {dependent.lastName}</p>
                  <p><strong>Relationship:</strong> {dependent.relationship}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents Summary */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg relative group">
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit('income')}
              className="p-1 text-gray-500 hover:text-primary-500"
              title="Edit documents"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-lg font-medium mb-3 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Uploaded Documents ({documents.length})
          </h3>
          <div className="space-y-2">
            {documents.map((doc, index) => (
              <div key={index} className="text-sm flex justify-between items-center group/document p-2 rounded-md hover:bg-gray-100">
                <span>{doc.file.name}</span>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-4">{doc.type}</span>
                  <button
                    onClick={() => onRemoveDocument(index)}
                    className="p-1 text-red-500 hover:text-red-600 opacity-0 group-hover/document:opacity-100 transition-opacity"
                    title="Remove document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-md mb-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-6 border-t">
          <button
            onClick={onBack}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            disabled={isSubmitting}
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 
              flex items-center space-x-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">⌛</span>
                <span>Submitting...</span>
              </>
            ) : (
              'Submit Documents'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};