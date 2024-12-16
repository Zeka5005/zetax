import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { IncomeTypes } from './IncomeTypes';
import { EmploymentIncomeUpload } from './income-types/EmploymentIncomeUpload';
import { SelfEmploymentUpload } from './income-types/SelfEmploymentUpload';
import { InvestmentIncomeUpload } from './income-types/InvestmentIncomeUpload';
import { OtherIncomeUpload } from './income-types/OtherIncomeUpload';
import { UploadedDocument } from '../../types/documents';
import { DocumentSummary } from './DocumentSummary';

interface IncomeDocumentSectionProps {
  documents: UploadedDocument[];
  onDocumentProcessed: (document: UploadedDocument) => void;
  onRemoveDocument: (index: number) => void;
}

export const IncomeDocumentSection: React.FC<IncomeDocumentSectionProps> = ({
  documents,
  onDocumentProcessed,
  onRemoveDocument,
}) => {
  const [incomeTypes, setIncomeTypes] = useState({
    employmentIncome: false,
    selfEmploymentIncome: false,
    investmentIncome: false,
    rentalIncome: false,
    retirementIncome: false,
    otherIncome: false,
  });

  // Filter documents by type
  const w2Documents = documents.filter(doc => doc.type === 'W2');
  const necDocuments = documents.filter(doc => doc.type === '1099NEC');
  const investmentDocuments = documents.filter(doc => 
    doc.type === '1099DIV' || doc.type === '1099INT'
  );
  const otherDocuments = documents.filter(doc => doc.type === 'OTHER');

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          Income Information
        </h2>

        <IncomeTypes
          incomeData={incomeTypes}
          onUpdate={setIncomeTypes}
        />
      </div>

      {incomeTypes.employmentIncome && (
        <div className="space-y-4">
          <EmploymentIncomeUpload
            documents={w2Documents}
            onDocumentProcessed={onDocumentProcessed}
            onRemoveDocument={(index) => onRemoveDocument(documents.indexOf(w2Documents[index]))}
          />
          {w2Documents.length > 0 && (
            <div className="p-4 bg-green-50 rounded-md">
              <p className="text-sm text-green-700">
                {w2Documents.length} W-2 {w2Documents.length === 1 ? 'form' : 'forms'} uploaded
              </p>
            </div>
          )}
        </div>
      )}

      {incomeTypes.selfEmploymentIncome && (
        <div className="space-y-4">
          <SelfEmploymentUpload
            documents={necDocuments}
            onDocumentProcessed={onDocumentProcessed}
            onRemoveDocument={(index) => onRemoveDocument(documents.indexOf(necDocuments[index]))}
          />
          {necDocuments.length > 0 && (
            <div className="p-4 bg-green-50 rounded-md">
              <p className="text-sm text-green-700">
                {necDocuments.length} 1099-NEC {necDocuments.length === 1 ? 'form' : 'forms'} uploaded
              </p>
            </div>
          )}
        </div>
      )}

      {incomeTypes.investmentIncome && (
        <div className="space-y-4">
          <InvestmentIncomeUpload
            documents={investmentDocuments}
            onDocumentProcessed={onDocumentProcessed}
            onRemoveDocument={(index) => onRemoveDocument(documents.indexOf(investmentDocuments[index]))}
          />
          {investmentDocuments.length > 0 && (
            <div className="p-4 bg-green-50 rounded-md">
              <p className="text-sm text-green-700">
                {investmentDocuments.length} investment {investmentDocuments.length === 1 ? 'form' : 'forms'} uploaded
              </p>
            </div>
          )}
        </div>
      )}

      {(incomeTypes.retirementIncome || incomeTypes.otherIncome) && (
        <div className="space-y-4">
          <OtherIncomeUpload
            documents={otherDocuments}
            onDocumentProcessed={onDocumentProcessed}
            onRemoveDocument={(index) => onRemoveDocument(documents.indexOf(otherDocuments[index]))}
          />
          {otherDocuments.length > 0 && (
            <div className="p-4 bg-green-50 rounded-md">
              <p className="text-sm text-green-700">
                {otherDocuments.length} additional {otherDocuments.length === 1 ? 'document' : 'documents'} uploaded
              </p>
            </div>
          )}
        </div>
      )}

      {documents.length > 0 && (
        <div className="mt-8">
          <DocumentSummary documents={documents} />
        </div>
      )}
    </div>
  );
};