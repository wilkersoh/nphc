import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

interface Test {
  children: JSX.Element;
  wrapperId: string;
}

const ReactPortal = ({ children , wrapperId = "react-portal-wrapper" }: Test) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement>();

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId) as HTMLElement;
    let systemCreated = false;

    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      if(systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }

  }, [wrapperId]);

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null || wrapperElement === undefined) return null;

  return createPortal(children, wrapperElement as HTMLElement);
}

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

export default ReactPortal;