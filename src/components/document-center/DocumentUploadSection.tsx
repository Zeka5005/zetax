import React, { useState } from 'react';
import { PersonalInformation } from './PersonalInformation';
import { IncomeTypes } from './IncomeTypes';
import { DocumentUpload } from './DocumentUpload';
import { DocumentList } from './DocumentList';
import { DocumentSummary } from './DocumentSummary';

interface DocumentUploadSectionProps {
  onDocumentsUpdate: (documents: any[]) => void;
}

export const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({
  onDocumentsUpdate
}) => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    ssn: '',
    dateOfBirth: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [incomeTypes, setIncomeTypes] = useState({
    employmentIncome: false,
    selfEmploymentIncome: false,
    investmentIncome: false,
    rentalIncome: false,
    retirementIncome: false,
    otherIncome: false,
  });

  const [documents, setDocuments] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleDocumentProcessed = (document: any) => {
    const updatedDocuments = [...documents, document];
    setDocuments(updatedDocuments);
    onDocumentsUpdate(updatedDocuments);
  };

  const handleRemoveDocument = (index: number) => {
    const updatedDocuments = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocuments);
    onDocumentsUpdate(updatedDocuments);
  };

  return (
    <div className="space-y-6">
      <PersonalInformation
        personalInfo={personalInfo}
        onUpdate={setPersonalInfo}
        errors={errors}
      />

      <IncomeTypes
        incomeData={incomeTypes}
        onUpdate={setIncomeTypes}
      />

      {Object.values(incomeTypes).some(Boolean) && (
        <div className="space-y-6">
          <DocumentUpload
            onDocumentProcessed={handleDocumentProcessed}
            allowedTypes={['W2', '1099NEC', '1099INT', '1099DIV']}
          />

          {documents.length > 0 && (
            <>
              <DocumentList
                documents={documents}
                onRemove={handleRemoveDocument}
              />
              <DocumentSummary documents={documents} />
            </>
          )}
        </div>
      )}
    </div>
  );
};