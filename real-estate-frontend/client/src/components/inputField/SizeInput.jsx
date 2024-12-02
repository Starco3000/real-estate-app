import { useState } from 'react';
import InputField from './InputField';

const SizeInput = ({ value, onChange }) => {
  const [unit, setUnit] = useState('m²');

  const convertSize = (amount, unit) => {
    if (!amount) return '';
    const numericAmount = parseFloat(amount);
    if (unit === 'm²') return numericAmount;
    if (unit === 'km²') return numericAmount * 1e6;
    return numericAmount;
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
    const convertedValue = convertSize(value.amount, e.target.value);
    onChange({ amount: value.amount, unit: e.target.value, convertedValue });
  };

  const handleValueChange = (e) => {
    const amount = e.target.value;
    const convertedValue = convertSize(amount, unit);
    onChange({ amount, unit, convertedValue });
  };

  return (
    <div className='flex items-center'>
      <InputField
        type='text'
        id={'size'}
        name={'size'}
        value={value.amount}
        onChange={handleValueChange}
        placeholder='Diện tích'
      />
      <select
        value={unit}
        onChange={handleUnitChange}
        className='ml-2 h-10 bg-white rounded border-[1px] border-gray-300 px-2 '
      >
        <option value='m²'>m²</option>
        <option value='km²'>km²</option>
      </select>
    </div>
  );
};

export default SizeInput;
