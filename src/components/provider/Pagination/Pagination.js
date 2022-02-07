import React from 'react';
const paginationStyle = {
  width: 'fit-content',
  margin: '0 auto',
  marginTop: '1em',
}

const Pagination = ({perPage, total, paginate, currentPage}) => {
    const pageNumbers= [];
    for(let i = 1; i<=Math.ceil(total/perPage); i++){
      pageNumbers.push(i);
    }
    return(
        <nav style={paginationStyle} >
          <ul className="pagination">
          {pageNumbers.map(number =>(
            <li key={number} className={'page-item ' + (number===currentPage ? 'active' : '')}>
                <a className="page-link" onClick={() =>paginate(number)} >{number}</a>
            </li>
          ))}
          </ul>
        </nav>
    )
}

export default Pagination;
