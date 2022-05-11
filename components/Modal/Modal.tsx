import React from 'react'
import ReactDOM from "react-dom";
import { AiOutlineClose } from 'react-icons/ai';

interface IModal {
  show: boolean;
  title: string;
  onClose: () => void;
  handleOnSubmit: () => void;
  className?: string
  children?: JSX.Element;
}

const Modal = ({ show, onClose, title, handleOnSubmit, className = "", children }: IModal) => {

  const modalConent = show ? (
    <div className={`modal modalBackground ${ className }`}>
      <div className='modalContainer'>
        <div className='header'>
          <div className='text-2xl'>{ title }</div>
          <div
            className='cursor-pointer'
            onClick={ onClose }>
            <AiOutlineClose />
          </div>
        </div>
        <form onSubmit={ handleOnSubmit } className='flex flex-col flex-1'>
          <div className='content '>
            { children }
          </div>
          <div className='footer mt-auto'>
            <button type="submit" className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  ) : null;

  if( !show ) return null;

  return ReactDOM.createPortal(
    modalConent,
    document.getElementById("modal-root")!
  )
}

export default Modal