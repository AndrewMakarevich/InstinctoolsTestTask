import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { UserStoreActions } from '../../redux/reducers/userReducer';
import CommonParamsFilterList from './commonParamsFilterList/commonParamsFilterList';
import EmployeeFilterList from './employeeFilterList/employeeFilterList';
import './filterList.css';
import ManagerFilterList from './managerFilterList/managerFilterList';
import SortList from './sortList/sortList';
import UsersTypeFilter from './usersTypeFilter/usersTypeFilter';
interface test {
  [key: string]: any;
}
const FilterList = () => {
  const dispatch = useDispatch();
  const { filterObj, userType } = useTypedSelector(state => state.user);
  function setTimeRange(value: string, keyName: 'startTimeLunch' | 'endTimeLunch' | 'startTimeReception' | 'endTimeReception', index: 'start' | 'end') {
    if (!filterObj[keyName]) {
      if (index === 'start') return dispatch({ type: UserStoreActions.CHANGE_FILTER_OBJECT, payload: { ...filterObj, [keyName]: `${value}-` } });
      else if (index === 'end') return dispatch({ type: UserStoreActions.CHANGE_FILTER_OBJECT, payload: { ...filterObj, [keyName]: `-${value}` } });
    } else {
      if (index === 'start') {
        const timeValues = filterObj[keyName].split('-');
        timeValues[0] = value;
        filterObj[keyName] = timeValues.join('-');
        return dispatch({ type: UserStoreActions.CHANGE_FILTER_OBJECT, payload: { ...filterObj } })
      } else {
        const timeValues = filterObj[keyName].split('-');
        timeValues[1] = value;
        filterObj[keyName] = timeValues.join('-');
        return dispatch({ type: UserStoreActions.CHANGE_FILTER_OBJECT, payload: { ...filterObj } })
      }
    }
  }

  function setPrimitiveFilterParam(param: string, value: string | number) {
    if (!String(value).split(' ').join('')) {
      delete filterObj[param]
    } else filterObj[param] = value;
    return dispatch({ type: UserStoreActions.CHANGE_FILTER_OBJECT, payload: { ...filterObj } });
  }
  function clearTimeRange(inputsClassName: string, filterPropName: "startTimeLunch" | "endTimeLunch" | "startTimeReception" | "endTimeReception") {
    setPrimitiveFilterParam(filterPropName, '');
    document.querySelectorAll(`.${inputsClassName}`).forEach((timeinput: any) => timeinput.value = '');
  }
  return (
    <article className="filter-list__wrapper">
      <CommonParamsFilterList setPrimitiveFilterParam={setPrimitiveFilterParam} />
      <UsersTypeFilter />
      {
        userType === 'employee' || userType === 'all' ?
          <EmployeeFilterList setTimeRange={setTimeRange} clearTimeRange={clearTimeRange} setPrimitiveFilterParam={setPrimitiveFilterParam} />
          :
          null
      }
      {
        userType === 'manager' || userType === 'all' ?
          <ManagerFilterList setTimeRange={setTimeRange} clearTimeRange={clearTimeRange} />
          :
          null
      }
      <SortList />
    </article>
  )
}
export default FilterList;