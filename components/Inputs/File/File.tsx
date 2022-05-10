import React from 'react'

interface IFile {
  className?: string;
  uploading: boolean;
}

const InputFile = ({ className = "", uploading }: IFile ) => {
  return (
    <label>
      <input
        type="file"
        accept='.csv'
        disabled={ uploading }
        className={`hidden ${ className }`}
      />
      <div className='cursor-pointer'>
        Upload Excel File
      </div>
    </label>
  )
}

export default InputFile