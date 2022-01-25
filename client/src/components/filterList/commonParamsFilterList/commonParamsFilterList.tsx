import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../redux/hooks/useTypedSelector";
import { UserStoreActions } from "../../../redux/reducers/userReducer";

const CommonParamsFilterList = ({ setPrimitiveFilterParam }: { setPrimitiveFilterParam: Function }) => {
    const dispatch = useDispatch();
    const filterObj = useTypedSelector(state => state.user.filterObj);
    function setFullName(param: string, value: string) {
        if (!filterObj['fullName']) {
            filterObj['fullName'] = {};
        }
        if (typeof value === 'string' && !value.split(' ').join('')) {
            delete filterObj['fullName'][param]
        } else filterObj['fullName'][param] = value;
        return dispatch({ type: UserStoreActions.CHANGE_FILTER_OBJECT, payload: { ...filterObj } });
    }

    return (
        <form className="filter-list__form">
            <h3>Common params:</h3>
            <label className='filter-list__label'>
                Name:
                <input
                    onChange={(e) => setFullName('name', e.target.value)}
                    className='filter-list__input'></input>
                <span className="filter-list__input-styled-line"></span>
            </label>
            <label className='filter-list__label'>
                Surname:
                <input
                    onChange={(e) => setFullName('surname', e.target.value)}
                    className='filter-list__input'>
                </input>
                <span className="filter-list__input-styled-line"></span>
            </label>
            <label className='filter-list__label'>
                Patronymic:
                <input
                    onChange={(e) => setFullName('patronymic', e.target.value)}
                    className='filter-list__input'></input>
                <span className="filter-list__input-styled-line"></span>
            </label>
            <label className='filter-list__label'>
                Salary:
                <input
                    onChange={(e) => setPrimitiveFilterParam('salary', e.target.value)}
                    className='filter-list__input'></input>
                <span className="filter-list__input-styled-line"></span>
            </label>
        </form>
    )
}
export default CommonParamsFilterList;