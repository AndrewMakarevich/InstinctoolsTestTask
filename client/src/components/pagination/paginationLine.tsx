import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { UserStoreActions } from '../../redux/reducers/userReducer';
import './paginationLine.css';
const PaginationLine = () => {
  const userStore = useTypedSelector(state => state.user);
  const usersData = userStore.usersData;
  const currentPage = usersData.currentPage;
  const pagesQty = usersData.pageQty;
  const dispatch = useDispatch();

  const pagesCountArr: number[] = [];
  if (pagesQty) {
    for (let i = 1; i <= pagesQty; i++) {
      pagesCountArr.push(i);
    }
  }
  let visiblePages: (number | string)[] = [];
  if (pagesQty && pagesQty <= 7) {
    visiblePages = pagesCountArr;
  } else {
    if (pagesQty && currentPage) {
      const firstIndex = pagesCountArr[0];
      const lastIndex = pagesCountArr[pagesCountArr.length - 1];
      visiblePages.push(firstIndex);
      if ((currentPage === firstIndex) || (currentPage - firstIndex <= 3 && currentPage - firstIndex >= 1)) {
        for (let i = 2; i <= 5; i++) {
          visiblePages.push(i);
        }
        visiblePages.push('...');
      } else if ((currentPage === lastIndex) || (lastIndex - currentPage <= 3 && lastIndex - currentPage >= 1)) {
        visiblePages.push('...');
        for (let i = lastIndex - 4; i < lastIndex; i++) {
          visiblePages.push(i);
        }
      } else {
        visiblePages.push('...');
        visiblePages.push(currentPage - 1);
        visiblePages.push(currentPage);
        visiblePages.push(currentPage + 1);
        visiblePages.push('...');
      }
      visiblePages.push(lastIndex);

    }
  }
  return (
    <div className="pagination-line__component">
      <ul className="pagination-line__pages-list">
        {
          visiblePages.map((pageNumber, index) =>
            <li key={index} className="pagination-line__pages-item">
              {
                pageNumber === '...' ?
                  <button
                    className={`pagination-line__pages-btn`}
                    onClick={() => {
                      if (index === 1) {
                        dispatch({ type: UserStoreActions.CHANGE_CURRENT_PAGE, payload: Number(visiblePages[2]) - 1 });
                      } else if (index === visiblePages.length - 2) {
                        dispatch({ type: UserStoreActions.CHANGE_CURRENT_PAGE, payload: Number(visiblePages[visiblePages.length - 3]) + 1 });
                      }

                    }}>
                    <span>{pageNumber}</span>
                  </button>
                  :
                  <button
                    className={`pagination-line__pages-btn ${currentPage === pageNumber ? 'currentPage' : ''}`}
                    onClick={() => {
                      dispatch({ type: UserStoreActions.CHANGE_CURRENT_PAGE, payload: pageNumber })
                    }
                    }>
                    <span>{pageNumber}</span>
                  </button>
              }
            </li>
          )
        }
      </ul>
    </div>
  )
};
export default PaginationLine;