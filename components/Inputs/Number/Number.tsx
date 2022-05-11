import React from 'react'

interface IInputNumber {
  value?: string;
  name: string;
  onChange: () => void;
  className?: string;
  children?: JSX.Element;
  placeholder: string;
}

const InputNumber = ({ value = "", name, onChange, className = "", placeholder, children }: IInputNumber) => {
  return (
    <input
    value={ value }
    step=".01"
    onChange={ onChange }
    className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${ className }`}
    id={name }
    name={ name }
    type="number"
    placeholder={ placeholder } />
  )
}

export default InputNumber;