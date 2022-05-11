import React, { useState } from 'react'

interface IInputSelect {
  show: boolean;
  onClose: () => void;
  handleOnChangeFilter: ( event: React.MouseEvent<HTMLElement>, query: string ) => void;
}

const InputSelect = ({ show, onClose, handleOnChangeFilter }: IInputSelect ) => {
  const [ displayText, setDisplayText ] = useState<string>( "Sory By" )

  const handleSelected = ( query: string, event: React.MouseEvent<HTMLElement> ) => {
    const { outerText }: any = event.target

    handleOnChangeFilter( event, query )
    setDisplayText( outerText )

    onClose();
  }

  return (
    <div className={`relative inline-block text-left ${ show ? 'z-0' : 'z-[-1]' }`}>
      <div>
        <button type="button" className="w-[250px] inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
          { displayText }
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div id="sort-by" className={`origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button ${ show ? 'block' : 'hidden '}`}>
        <div className="py-1" role="none">
          <span onClick={( e ) => handleSelected( "sortBys=name&sortBys=asc", e ) } className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">Name, Alphabetically, A-Z</span>
          <span onClick={( e ) => handleSelected( "sortBys=name&sortBys=desc", e ) } className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">Name, Alphabetically, Z-A</span>
          <span onClick={( e ) => handleSelected( "sortBys=salary&sortBys=asc", e ) } className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">Salary, low to high</span>
          <span onClick={( e ) => handleSelected( "sortBys=salary&sortBys=desc", e ) } className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">Salary, high to low</span>
          <span onClick={( e ) => handleSelected( "sortBys=createdAt&sortBys=asc", e ) } className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">Created, old to new</span>
          <span onClick={( e ) => handleSelected( "sortBys=createdAt&sortBys=desc", e ) } className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">Created, new to old</span>
        </div>
      </div>
    </div>
  )
}

export default InputSelect