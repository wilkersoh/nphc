import React from 'react'

interface IInputText {
  value?: string;
  name: string;
  onChange: () => void;
  className?: string | boolean;
}

const InputText = ({ value = "", name, onChange, className = "" }: IInputText) => {
  return (
    <input
      value={ value }
      onChange={ onChange }
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${ className && 'border border-red-500' }`}
      id={ name }
      name={ name }
      type="text"
      placeholder={ name } />
  )
}

export default InputText