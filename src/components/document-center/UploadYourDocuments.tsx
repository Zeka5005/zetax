import React, { useState } from 'react';
import { PersonalInformation } from './PersonalInformation';
import { DependentQuestion } from './DependentQuestion';
import { DependentsList } from './DependentsList';
import { IncomeDocumentSection } from './IncomeDocumentSection';
import { ReviewSubmitSection } from './ReviewSubmitSection';
import { NavigationButtons } from './NavigationButtons';
import { UploadedDocument } from '../../types/documents';
import { useAuth } from '../../contexts/AuthContext';
import { documentService } from '../../services/firebase/documents';
import { validatePersonalInfo } from '../../utils/validation/personalInfoValidation';
import { TaxPayer } from '../../types/tax';

type Step = 'personal' | 'dependents' | 'income' | 'review';

const initialPersonalInfo: TaxPayer = {
  firstName: '',
  lastName: '',
  ssn: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  occupation: '',
  address: {
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
  },
  filingStatus: 'single',
  dependents: 0,
  age: 0,
  isBlind: false,
  children: [],
  spouseInfo: undefined,
};

export const UploadYourDocuments: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [personalInfo, setPersonalInfo] = useState<TaxPayer>(initialPersonalInfo);
  const [hasDependents, setHasDependents] = useState<boolean | null>(null);
  const [dependents, setDependents] = useState<any[]>([]);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPersonalInfoValid, setIsPersonalInfoValid] = useState(false);

  const { user } = useAuth();

  const validateStep = () => {
    switch (currentStep) {
      case 'personal':
        const validationErrors = validatePersonalInfo(personalInfo);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
      case 'dependents':
        return hasDependents !== null;
      case 'income':
        return documents.length > 0;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep()) {
      return;
    }

    switch (currentStep) {
      case 'personal':
        setCurrentStep('dependents');
        break;
      case 'dependents':
        if (hasDependents === false) {
          setDependents([]);
          setPersonalInfo(prev => ({ ...prev, children: [] }));
        }
        setCurrentStep('income');
        break;
      case 'income':
        setCurrentStep('review');
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'dependents':
        setCurrentStep('personal');
        break;
      case 'income':
        setCurrentStep('dependents');
        break;
      case 'review':
        setCurrentStep('income');
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      throw new Error('Please sign in to submit documents');
    }

    try {
      for (const doc of documents) {
        await documentService.uploadDocument({
          ...doc,
          userId: user.uid
        });
      }
      return true;
    } catch (error) {
      console.error('Error submitting documents:', error);
      throw error;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <PersonalInformation
            personalInfo={personalInfo}
            onUpdate={setPersonalInfo}
            errors={errors}
            onValidationChange={setIsPersonalInfoValid}
          />
        );
      case 'dependents':
        return (
          <div className="space-y-6">
            <DependentQuestion
              hasDependents={hasDependents}
              onAnswer={setHasDependents}
            />
            {hasDependents && (
              <DependentsList
                dependents={dependents}
                onUpdate={setDependents}
                errors={errors}
              />
            )}
          </div>
        );
      case 'income':
        return (
          <IncomeDocumentSection
            documents={documents}
            onDocumentProcessed={(doc) => setDocuments([...documents, doc])}
            onRemoveDocument={(index) => {
              const newDocs = [...documents];
              newDocs.splice(index, 1);
              setDocuments(newDocs);
            }}
          />
        );
      case 'review':
        return (
          <ReviewSubmitSection
            personalInfo={personalInfo}
            hasDependents={!!hasDependents}
            dependents={dependents}
            documents={documents}
            onSubmit={handleSubmit}
            onBack={handleBack}
            onEdit={(section) => setCurrentStep(section)}
            onRemoveDocument={(index) => {
              const newDocs = [...documents];
              newDocs.splice(index, 1);
              setDocuments(newDocs);
            }}
            onRemoveDependent={(index) => {
              const newDependents = [...dependents];
              newDependents.splice(index, 1);
              setDependents(newDependents);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {renderStepContent()}
      {currentStep !== 'review' && (
        <NavigationButtons
          currentStep={currentStep}
          onNext={handleNext}
          onBack={handleBack}
          isNextDisabled={
            (currentStep === 'personal' && !isPersonalInfoValid) ||
            (currentStep === 'dependents' && hasDependents === null) ||
            (currentStep === 'income' && documents.length === 0)
          }
        />
      )}
    </div>
  );
};