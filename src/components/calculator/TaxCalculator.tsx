import React, { useState } from 'react';
import { TaxpayerInfo } from '../taxpayer';
import { IncomeSection } from '../IncomeSection';
import { DeductionsSection } from '../DeductionsSection';
import { TaxSummary } from '../TaxSummary';
import { CreditsSection } from '../credits/CreditsSection';
import { SelfEmploymentDeductions } from './SelfEmploymentDeductions';
import { RentalIncomeDeductions } from './RentalIncomeDeductions';
import { useInitialState } from '../../hooks/useInitialState';

export const TaxCalculator = () => {
  const {
    taxpayerInfo,
    setTaxpayerInfo,
    income,
    setIncome,
    deductions,
    setDeductions,
    calculation,
    errors
  } = useInitialState();

  const [showSelfEmploymentDeductions, setShowSelfEmploymentDeductions] = useState(false);
  const [showRentalDeductions, setShowRentalDeductions] = useState(false);

  React.useEffect(() => {
    setShowSelfEmploymentDeductions(income.selfEmployment > 0);
    setShowRentalDeductions(income.rentalIncome > 0);
  }, [income.selfEmployment, income.rentalIncome]);

  const handleBusinessDeductionsUpdate = (businessDeductions: Record<string, number>) => {
    setIncome(prev => ({
      ...prev,
      businessExpenses: businessDeductions
    }));
  };

  const handleRentalDeductionsUpdate = (rentalDeductions: Record<string, number>) => {
    setIncome(prev => ({
      ...prev,
      rentalExpenses: rentalDeductions
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <TaxpayerInfo
            taxpayer={taxpayerInfo}
            onUpdate={setTaxpayerInfo}
            errors={errors}
          />
          <IncomeSection
            income={income}
            onUpdate={setIncome}
            errors={errors}
          />
          {showSelfEmploymentDeductions && (
            <SelfEmploymentDeductions
              deductions={income.businessExpenses}
              onUpdate={handleBusinessDeductionsUpdate}
            />
          )}
          {showRentalDeductions && (
            <RentalIncomeDeductions
              deductions={income.rentalExpenses || {}}
              onUpdate={handleRentalDeductionsUpdate}
            />
          )}
          <CreditsSection calculation={calculation} />
        </div>
        <div className="space-y-8">
          <DeductionsSection
            deductions={deductions}
            onUpdate={setDeductions}
            errors={errors}
          />
          <TaxSummary calculation={calculation} />
        </div>
      </div>
    </div>
  );
};