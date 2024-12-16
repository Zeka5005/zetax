// Update the handleChange function in TaxpayerInfo.tsx
const handleChange = (field: keyof TaxPayer, value: any) => {
  if (field === 'filingStatus') {
    // Initialize spouse info when switching to married filing status
    const newTaxpayer = {
      ...taxpayer,
      [field]: value,
      spouseInfo: value === 'married' || value === 'marriedSeparate' 
        ? taxpayer.spouseInfo || {
            firstName: '',
            lastName: '',
            ssn: '',
            dateOfBirth: '',
            occupation: ''
          }
        : undefined
    };
    onUpdate(newTaxpayer);
  } else {
    onUpdate({ ...taxpayer, [field]: value });
  }
};

// Add this to your JSX where you want the spouse info to appear
{(taxpayer.filingStatus === 'married' || taxpayer.filingStatus === 'marriedSeparate') && (
  <div className="border-t pt-6 mt-6">
    <SpouseInfo
      spouseInfo={taxpayer.spouseInfo || {
        firstName: '',
        lastName: '',
        ssn: '',
        dateOfBirth: '',
        occupation: ''
      }}
      onUpdate={(spouseInfo) => onUpdate({ ...taxpayer, spouseInfo })}
      errors={errors}
    />
  </div>
)}