import React from 'react'
import ReactDOM from "react-dom";
import "styles/components/Prompt/index.module.scss"

interface IPrompt {
  show: boolean;
  onClose: () => void;
  handleOnYes: () => void;
  children?: JSX.Element;
  className?: string
}

const Prompt = ({ show, onClose, handleOnYes, className, children }: IPrompt) => {

  const handleClose = ( e: React.MouseEvent<HTMLDivElement> ) => {
    e.preventDefault();
    onClose()
  }

  const promptContent = show ? (
    <div className={`prompt ${ className }`}>
      <div onClick={ handleClose }>
        close Button
      </div>
      <div>
        {children}
      </div>
      <div onClick={ handleClose }>No</div>
      <div onClick={ handleOnYes }>Yes</div>
    </div>
  ) : null;

  if ( !show ) return null;


  return ReactDOM.createPortal(
    promptContent,
    document.getElementById("modal-root")!
  )
}

export default Prompt