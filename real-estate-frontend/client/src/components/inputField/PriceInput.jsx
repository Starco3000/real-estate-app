import { useState } from 'react';
import InputField from './InputField';

const PriceInput = ({ value, onChange }) => {
  const [unit, setUnit] = useState('triệu');
  
  const convertPrice = (amount, unit) => {
    if (!amount) return '';
    const numericAmount = parseFloat(amount);
    if (unit === 'triệu') return numericAmount * 1e6;
    if (unit === 'tỷ') return numericAmount * 1e9;
    return numericAmount;
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
    const convertedValue = convertPrice(value.amount, e.target.value);
    onChange({ amount: value.amount, unit: e.target.value, convertedValue });
  };

  const handleValueChange = (e) => {
    const amount = e.target.value;
    const convertedValue = convertPrice(amount, unit);
    onChange({ amount, unit, convertedValue });
  };

  return (
    <div className='flex items-center'>
      <InputField 
        type='text'
        id={'price'}
        name={'price'}
        value={value.amount}
        onChange={handleValueChange}
        placeholder='Giá'
      />
      <select
        value={unit}
        onChange={handleUnitChange}
        className='ml-2 h-10 bg-white rounded border-[1px] border-gray-300 px-2'
      >
        <option value='triệu'>Triệu</option>
        <option value='tỷ'>Tỷ</option>
      </select>
    </div>
  );
};

export default PriceInput;