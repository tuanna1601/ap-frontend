import React from 'react';

const PREV_PAGES_COUNT = 10;
const NEXT_PAGES_COUNT = 10;

export default function renderPagination(total, perPage, curPage, goToPageCallback) {
  const pageCount = Math.ceil(total / perPage);
  const pages = [];

  const prevLimit = curPage - PREV_PAGES_COUNT;
  const nextLimit = curPage + NEXT_PAGES_COUNT;

  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 | i === pageCount || (i > prevLimit && i < nextLimit)) {
      pages.push(
        <li className={`paginate_button ${curPage === i && 'active'}`} key={i}>
          <a onClick={() => curPage !== i && goToPageCallback(i)}>{i}</a>
        </li>
      );
    }
    if ((i === 2 && i < prevLimit) || (i === pageCount - 1 && i > nextLimit)) {
      pages.push(
        <li className="paginate_button" key={i}>
          <a>...</a>
        </li>
      );
    }
  }

  return (
    <ul className="pagination pagination-sm no-margin pull-right">
      {pages}
    </ul>
  );
}
