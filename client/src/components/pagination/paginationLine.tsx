import './paginationLine.css';
const PaginationLine = ({ loadPageFunc, pagesQty, currentPage }: { loadPageFunc: Function, pagesQty: number | undefined, currentPage: number | undefined }) => {
  const pagesCountArr: number[] = [];
  if (pagesQty) {
    for (let i = 1; i <= pagesQty; i++) {
      pagesCountArr.push(i);
    }
  }

  return (
    <div className="pagination-line__component">
      <ul className="pagination-line__pages-list">
        {
          pagesCountArr.map(pageNumber =>
            <li className="pagination-line__pages-item">
              <button className={`pagination-line__pages-btn ${currentPage == pageNumber ? 'currentPage' : ''}`} onClick={() => loadPageFunc(pageNumber)}><span>{pageNumber}</span></button>
            </li>
          )
        }
      </ul>

    </div>
  )
};
export default PaginationLine;