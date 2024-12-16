{/* Update the SSN field */}
<FormField
  label="Social Security Number"
  type="ssn"
  value={spouseInfo.ssn}
  onChange={(value) => handleChange('ssn', value)}
  error={errors.spouseSSN}
  required
/>