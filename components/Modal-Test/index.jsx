import ReactPortal from 'components/ReactPortal';
import React, { useEffect, useRef, useId, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const ModalTest = ({ isOpen, handleClose, show, onClose, title, handleOnSubmit, className = "", children  }) => {
  const modalId = useId()

  useEffect(() => {
    const closeOnEscapeKey = e => e.key === 'Escape' ? onClose() : null;;
    const closeOnOverlay = ( e ) => {
      console.log("e: ", e);
      if( e.target.matches( `#test` ) || e.target.closest( ".modal" ) ) onClose();
    }

    document.body.addEventListener( "keydown", closeOnEscapeKey );
    document.body.addEventListener( "click", closeOnOverlay );

    return () => {
      document.body.removeEventListener( "keydown", closeOnEscapeKey );
      document.body.removeEventListener( "click", closeOnOverlay );
    }
  }, [ onClose ])

  const stopBubbling = ( e ) => e.stopPropagation();

  if( !show ) return null;

  return (
    <ReactPortal wrapperId={`portal-modal-${ modalId }`}>
      <div id={`test`}>
        <div className="modal modalBackground portal-modal"
          // style={{
          //   position: "fixed",
          //   inset: 0,
          //   backgroundColor: "red",
          //   display: 'flex',
          //   flexDirection: 'column',
          //   alignItems: "center",
          //   justifyContent: 'center',
          //   transition: "all 0.3s ease-in-out",
          //   overflow: 'hidden',
          //   zIndex: 999,
          //   padding: "40px 20px 20px"
          // }}
        >
          {/* <button onClick={handleClose} className="close-btn">
            Close
          </button> */}
          {/* <div className="modal-content" onClick={ stopBubbling }
            style={{
              width: "70%",
              height: '70%',
              backgroundColor: "#282c34",
              color: "#fff",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem'
            }}
          >{children}</div> */}
          <div className='modalContainer' onClick={ stopBubbling }>
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
      </div>
    </ReactPortal>
  )
}

export default ModalTest