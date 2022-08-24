import React from 'react'

export default function Button({postPerPage, totalPost,paginate}) {
    const pageNumbers = [];
    for(let i=1; i<=Math.ceil(totalPost/postPerPage); i++){
        pageNumbers.push(i);
    }
  return (
    <nav className='mx-auto'>
        <ul className='pagination'>
            {
                pageNumbers.map((value) => {
                    return(
                    <li key={value} className="page-item">
                        <a onClick={() => {paginate(value)}} className='page-link'>{value}</a>
                    </li>
                    )
                })
            }
        </ul>
    </nav>
  )
}
