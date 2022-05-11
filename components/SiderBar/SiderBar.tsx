import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

const SiderBar = () => {
  return (
    <div>
      {/* mobile Burger Menu */}
      <div className='md:hidden cursor-pointer '>
        <AiOutlineMenu />
      </div>
      {/* desktop */}
      <div className='hidden md:block'>

      </div>
    </div>
  )
}

export default SiderBar