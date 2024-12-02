import React from 'react';

function InputField({ type, id, name, placeholder, value, onChange, error}) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      className='w-full bg-slate-100 text-sm font-light p-[10px]  focus:outline-none rounded'
      value={value}
      onChange={onChange}
      error={error}
    />
  );
}

export default InputField;
