export interface TaxPayer {
  firstName: string;
  lastName: string;
  ssn: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  occupation: string;
  address: Address;
  filingStatus: FilingStatus;
  dependents: number;
  age: number;
  isBlind: boolean;
  children: ChildInfo[];
  spouseInfo?: SpouseInfoData;
}

export interface SpouseInfoData {
  firstName: string;
  lastName: string;
  ssn: string;
  dateOfBirth: string;
  occupation: string;
}

export interface Address {
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
}

// Rest of the file remains unchanged...