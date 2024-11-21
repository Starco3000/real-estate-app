import React from 'react';

function InputField({ type, id, name, placeholder }) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      className='w-full bg-slate-100 text-sm font-light p-2 mb-2 focus:outline-none rounded'
    />
  );
}

export default InputField;
