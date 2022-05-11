import React from 'react'

const Badge = ({ isTrue }: boolean  ) => {
  return (
    <span className={`inline-block w-2 h-2 rounded-full ${ isTrue ? 'bg-green-600' : 'bg-red-600' }`}></span>
  )
}

export default Badge