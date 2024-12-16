import React from 'react';
import { formatCurrency } from '../../utils/formatters';

interface CreditCardProps {
  title: string;
  amount: number;
  qualifyingChildren?: number;
  description?: string;
}

export const CreditCard: React.FC<CreditCardProps> = ({
  title,
  amount,
  qualifyingChildren,
  description,
}) => {
  if (amount <= 0) return null;

  return (
    <div className="flex justify-between items-center">
      <div>
        <span className="text-gray-700">{title}</span>
        {qualifyingChildren !== undefined && (
          <span className="text-sm text-gray-500 ml-2">
            ({qualifyingChildren} qualifying {qualifyingChildren === 1 ? 'child' : 'children'})
          </span>
        )}
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <span className="text-green-600 font-medium">
        {formatCurrency(amount)}
      </span>
    </div>
  );
};