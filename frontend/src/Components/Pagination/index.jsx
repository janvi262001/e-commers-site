import React from 'react'
import {  Pagination } from 'react-bootstrap';


function PaginationComponent({currentPage, totalPages, paginate}) {
  return (
       <Pagination className="mt-4 justify-content-center">
        <Pagination.Prev
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {[...Array(totalPages).keys()].map((num) => (
          <Pagination.Item
            key={num + 1}
            active={num + 1 === currentPage}
            onClick={() => paginate(num + 1)}
          >
            {num + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
  )
}

export default PaginationComponent;
