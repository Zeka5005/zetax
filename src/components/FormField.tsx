import React from 'react';
import { formatSSN } from '../utils/validation/ssnValidation';
import { formatPhoneNumber } from '../utils/validation/contactValidation';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'number' | 'select' | 'checkbox' | 'date' | 'ssn' | 'phone' | 'email';
  value: string | number | boolean;
  onChange: (value: any) => void;
  error?: string;
  options?: { value: string; label: string }[];
  prefix?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  options,
  prefix,
  placeholder,
  min,
  max,
  required
}) => {
  const handleSSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const formattedSSN = formatSSN(rawValue);
    onChange(formattedSSN);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    onChange(formattedPhone);
  };

  const baseInputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500";
  const errorClasses = error ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500" : "";

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className={`${baseInputClasses} ${errorClasses}`}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={value as boolean}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
        );

      case 'ssn':
        return (
          <input
            type="text"
            value={value as string}
            onChange={handleSSNChange}
            className={`${baseInputClasses} ${errorClasses}`}
            placeholder="XXX-XX-XXXX"
            maxLength={11}
            required={required}
          />
        );

      case 'phone':
        return (
          <input
            type="text"
            value={value as string}
            onChange={handlePhoneChange}
            className={`${baseInputClasses} ${errorClasses}`}
            placeholder="(XXX) XXX-XXXX"
            maxLength={14}
            required={required}
          />
        );

      case 'number':
        return (
          <div className="relative rounded-md shadow-sm">
            {prefix && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">{prefix}</span>
              </div>
            )}
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={value === 0 ? '' : value}
              onChange={(e) => {
                const val = e.target.value.replace(/[^\d.-]/g, '');
                onChange(val);
              }}
              className={`${baseInputClasses} ${errorClasses} ${prefix ? 'pl-7' : ''}`}
              placeholder={placeholder}
              min={min}
              max={max}
              required={required}
            />
          </div>
        );

      default:
        return (
          <input
            type={type}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className={`${baseInputClasses} ${errorClasses}`}
            placeholder={placeholder}
            required={required}
          />
        );
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};