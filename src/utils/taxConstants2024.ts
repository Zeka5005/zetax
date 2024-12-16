// 2024 Tax Brackets
export const TAX_BRACKETS_2024 = [
  { rate: 0.10, single: 11600, married: 23200, marriedSeparate: 11600, headOfHousehold: 16550 },
  { rate: 0.12, single: 47150, married: 94300, marriedSeparate: 47150, headOfHousehold: 63100 },
  { rate: 0.22, single: 100525, married: 201050, marriedSeparate: 100525, headOfHousehold: 100500 },
  { rate: 0.24, single: 191950, married: 383900, marriedSeparate: 191950, headOfHousehold: 191950 },
  { rate: 0.32, single: 243725, married: 487450, marriedSeparate: 243725, headOfHousehold: 243700 },
  { rate: 0.35, single: 609350, married: 731200, marriedSeparate: 365600, headOfHousehold: 609350 },
  { rate: 0.37, single: Infinity, married: Infinity, marriedSeparate: Infinity, headOfHousehold: Infinity },
];

// 2024 Standard Deduction
export const STANDARD_DEDUCTION_2024 = {
  single: 14600,
  married: 29200,
  marriedSeparate: 14600,
  headOfHousehold: 21900,
  blindOrElderly: 1550,
};

// 2024 Self Employment
export const SELF_EMPLOYMENT_2024 = {
  taxRate: 0.153,
  threshold: 400,
  socialSecurityWageBase: 168600,
  additionalMedicareTaxRate: 0.009,
  medicareThreshold: {
    single: 200000,
    married: 250000,
    marriedSeparate: 125000,
    headOfHousehold: 200000,
  },
};

// 2024 Earned Income Credit
export const EARNED_INCOME_CREDIT_2024 = {
  maxAmounts: {
    0: 600,
    1: 3995,
    2: 6604,
    3: 7430,
  },
  incomeThresholds: {
    single: {
      0: 17640,
      1: 46560,
      2: 52918,
      3: 56838,
    },
    married: {
      0: 24210,
      1: 53120,
      2: 59478,
      3: 63398,
    },
    marriedSeparate: {
      0: 17640,
      1: 46560,
      2: 52918,
      3: 56838,
    },
    headOfHousehold: {
      0: 17640,
      1: 46560,
      2: 52918,
      3: 56838,
    },
  },
  phaseInRates: {
    0: 0.0765,
    1: 0.3400,
    2: 0.4000,
    3: 0.4500,
  },
  phaseOutRates: {
    0: 0.0765,
    1: 0.1598,
    2: 0.2106,
    3: 0.2106,
  },
  phaseoutStart: {
    single: {
      0: 9800,
      1: 21600,
      2: 21600,
      3: 21600,
    },
    married: {
      0: 15800,
      1: 27600,
      2: 27600,
      3: 27600,
    },
    marriedSeparate: {
      0: 9800,
      1: 21600,
      2: 21600,
      3: 21600,
    },
    headOfHousehold: {
      0: 9800,
      1: 21600,
      2: 21600,
      3: 21600,
    },
  },
};