import React from 'react'
import RcPagination from "rc-pagination";
import "rc-pagination/assets/index.css";

const Pagination = ({ countPerPage, updatePage, currentPage, totalPage }) => {
  return (
    <div className='mt-8'>
      <RcPagination
        pageSize={ countPerPage }
        onChange={ updatePage }
        current={ currentPage }
        total={ countPerPage * totalPage }
      />
    </div>
  )
}

export default Pagination