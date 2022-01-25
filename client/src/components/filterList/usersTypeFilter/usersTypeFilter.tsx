import { useDispatch, useSelector } from "react-redux";
import { useTypedSelector } from "../../../redux/hooks/useTypedSelector";
import { UserStoreActions } from "../../../redux/reducers/userReducer";

const UsersTypeFilter = () => {
    const dispatch = useDispatch();
    return (
        <form className="filter-list__form">
            <h3>User type:</h3>
            <label className='filter-list__label filter-list__radio-label'>
                Employee
                <input onChange={(e) => dispatch({ type: UserStoreActions.CHANGE_USER_TYPE, payload: e.target.value })} name="user-type__radio" value="employee" type="radio" className="filter-list__radio"></input>
                <span className="filter-list__radio-span"></span>
            </label>
            <label className='filter-list__label filter-list__radio-label'>
                Manager
                <input onChange={(e) => dispatch({ type: UserStoreActions.CHANGE_USER_TYPE, payload: e.target.value })} name="user-type__radio" value="manager" type="radio" className="filter-list__radio"></input>
                <span className="filter-list__radio-span"></span>
            </label>
            <label className='filter-list__label filter-list__radio-label'>
                All
                <input onChange={(e) => dispatch({ type: UserStoreActions.CHANGE_USER_TYPE, payload: e.target.value })} name="user-type__radio" value="all" type="radio" className="filter-list__radio"></input>
                <span className="filter-list__radio-span"></span>
            </label>
        </form >
    )
};
export default UsersTypeFilter;