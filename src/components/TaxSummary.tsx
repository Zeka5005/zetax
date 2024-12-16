import React from 'react';
import { Calculator, ArrowDown, ArrowUp, DollarSign } from 'lucide-react';
import { TaxCalculation } from '../types/tax';
import { TaxBracketInfo } from './tax-display/TaxBracketInfo';
import { CreditsSummary } from './credits/CreditsSummary';
import { formatCurrency, formatPercent } from '../utils/formatters';

interface TaxSummaryProps {
  calculation: TaxCalculation;
}

export const TaxSummary: React.FC<TaxSummaryProps> = ({ calculation }) => {
  const overpaidAmount = calculation.refundAmount;
  const hasOverpaidTaxes = overpaidAmount > 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center">
          <Calculator className="w-5 h-5 mr-2" />
          Tax Summary
        </h2>
        <TaxBracketInfo 
          filingStatus={calculation.filingStatus} 
          taxableIncome={calculation.taxableIncome} 
        />
      </div>
      
      <div className="space-y-4">
        {/* Income Section */}
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-gray-600">Total Income</span>
          <span className="font-medium">{formatCurrency(calculation.totalIncome)}</span>
        </div>
        
        {/* Deductions Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Standard Deduction</span>
            <span>{formatCurrency(calculation.standardDeduction)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Itemized Deductions</span>
            <span>{formatCurrency(calculation.itemizedDeductions)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Effective Deductions</span>
            <span className="font-medium text-green-600">
              -{formatCurrency(calculation.effectiveDeductions)}
            </span>
          </div>
        </div>

        {/* Taxable Income */}
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-gray-600">Taxable Income</span>
          <span className="font-medium">{formatCurrency(calculation.taxableIncome)}</span>
        </div>

        {/* Tax Calculation Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Income Tax</span>
            <span>{formatCurrency(calculation.estimatedTax)}</span>
          </div>
          
          {calculation.selfEmploymentTax > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Self-Employment Tax</span>
              <span>{formatCurrency(calculation.selfEmploymentTax)}</span>
            </div>
          )}

          {/* Credits Summary */}
          <CreditsSummary calculation={calculation} />

          <div className="flex justify-between items-center font-medium border-t pt-2">
            <span>Total Tax Liability</span>
            <span>{formatCurrency(calculation.totalTaxLiability)}</span>
          </div>
        </div>

        {/* Payments Section */}
        <div className="space-y-2 border-t pt-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tax Withholdings</span>
            <span className="text-green-600">+{formatCurrency(calculation.totalPayments)}</span>
          </div>
        </div>

        {/* Final Result Section */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          {hasOverpaidTaxes ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-green-600 flex items-center">
                  <ArrowDown className="w-5 h-5 mr-2" />
                  Tax Refund
                </span>
                <span className="text-lg font-bold text-green-600">
                  {formatCurrency(overpaidAmount)}
                </span>
              </div>
              <div className="p-3 bg-green-50 rounded-md border border-green-100">
                <div className="flex items-start">
                  <DollarSign className="w-5 h-5 text-green-600 mt-0.5 mr-2" />
                  <div>
                    <h4 className="font-medium text-green-800">Overpaid Taxes</h4>
                    <p className="text-sm text-green-700 mt-1">
                      You have overpaid {formatCurrency(overpaidAmount)} through tax withholdings and credits. 
                      This amount will be refunded to you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-red-600 flex items-center">
                  <ArrowUp className="w-5 h-5 mr-2" />
                  Tax Due
                </span>
                <span className="text-lg font-bold text-red-600">
                  {formatCurrency(calculation.amountDue)}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Additional tax payment required
              </p>
            </div>
          )}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
            <span>Effective Tax Rate</span>
            <span>{formatPercent(calculation.effectiveTaxRate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};