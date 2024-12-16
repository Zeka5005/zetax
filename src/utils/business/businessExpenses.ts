import { BusinessExpenses } from '../../types/tax';

export const calculateTotalBusinessExpenses = (expenses: BusinessExpenses): number => {
  if (!expenses) return 0;
  
  return Object.values(expenses).reduce((total, expense) => total + (expense || 0), 0);
};

export const calculateNetBusinessIncome = (
  grossIncome: number,
  expenses: BusinessExpenses
): number => {
  const totalExpenses = calculateTotalBusinessExpenses(expenses);
  // Allow negative values to represent business losses
  return grossIncome - totalExpenses;
};

export const calculateBusinessLoss = (
  grossIncome: number,
  expenses: BusinessExpenses
): number => {
  const netIncome = calculateNetBusinessIncome(grossIncome, expenses);
  return netIncome < 0 ? Math.abs(netIncome) : 0;
};