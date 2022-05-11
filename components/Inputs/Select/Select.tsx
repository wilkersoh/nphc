import React, { useState } from 'react'

interface IInputSelect {
  show: boolean;
  handleOnChangeFilter: ( event: React.MouseEvent<HTMLElement>, query: string ) => void;
  displayText: string;
  children?: JSX.Element;
  width?: string;
}

const InputSelect = ({ show, width = "250px", displayText, children }: IInputSelect ) => {

  return (
    <div className={`relative inline-block text-left ${ show ? 'z-0' : 'z-[-1]' }`}>
      <div>
        <button type="button" className={`w-[250px] inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${ width }`} id="menu-button" aria-expanded="true" aria-haspopup="true">
          { displayText }
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      {
        children
      }
    </div>
  )
}

export default InputSelect