import React from 'react'
import ReactDOM from "react-dom";
import { AiOutlineClose } from 'react-icons/ai';

interface IPrompt {
  show: boolean;
  onClose: () => void;
  handleOnYes: () => void;
  children?: JSX.Element;
  className?: string
}

const Prompt = ({ show, onClose, handleOnYes, className = "", children }: IPrompt) => {

  const handleClose = () => onClose()

  const promptContent = show ? (
    <div className={`prompt promptBackground ${ className }`}>
      <div className='promptContainer'>
        <div className='header'>
          <div className='text-2xl'>Delete User</div>
          <div
            className='cursor-pointer'
            onClick={ onClose }>
            <AiOutlineClose />
          </div>
        </div>
        <div>
          <div className='content'>
            { children }
          </div>
        </div>

        <div className='flex justify-center mt-4'>
          <button onClick={ handleClose } className="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">No</button>
          <button onClick={ handleOnYes } className="mr-auto ml-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Yes</button>
        </div>
      </div>
    </div>
  ) : null;

  if ( !show ) return null;


  return ReactDOM.createPortal(
    promptContent,
    document.getElementById("modal-root")!
  )
}

export default Prompt