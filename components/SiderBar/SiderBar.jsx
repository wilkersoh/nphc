import Link from 'next/link';
import React, { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

const SiderBar = () => {
  const [ showMobileSideBar, setShowMobileSideBar ] = useState( false );

  const toggleMobileSideBar = () => {
    setShowMobileSideBar( !showMobileSideBar )
  }

  return (
    <div>
      {/* mobile Burger Menu */}
      <div onClick={ toggleMobileSideBar } className={`md:hidden cursor-pointer sideBarMenu sideBarMenuShadow`}>
        {
          !showMobileSideBar ?
            < AiOutlineMenu />
          : <div className='text-white'>X</div>
        }
      </div>

      {/* desktop */}
      <div className={`md:flex md:flex-col content-center w-0 h-full md:w-[350px] overflow-hidden sideBarMenuShadow ${ showMobileSideBar && 'sideBarMenuContainer' }`}>
        <div className='py-8 text-center'>
          Logo
          {/* <Link href="/">Logo</Link> */}
        </div>
        <div>
          <ul className='mt-10 text-center'>
            {
              new Array(5).fill(null).map((_, index) => (
                <li key={ index } className="py-6 px-2 cursor-help">{`Function ${ index + 1}`}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SiderBar