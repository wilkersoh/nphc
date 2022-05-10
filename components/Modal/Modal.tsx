import React from 'react'
import ReactDOM from "react-dom";

interface IModal {
  show: boolean;
  onClose: () => void;
  className?: string
  children?: JSX.Element;
}

const Modal = ({ show, onClose, children, className }: IModal) => {

  const modalConent = show ? (
    <div className={`modal ${ className }`}>
      <div className='header'>
        <div onClick={ onClose }>Close button</div>
      </div>
      <div>
        { children }
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