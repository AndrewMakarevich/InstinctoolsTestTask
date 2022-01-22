import { useEffect, useState } from 'react';
import CommonParamsFilterList from './commonParamsFilterList/commonParamsFilterList';
import EmployeeFilterList from './employeeFilterList/employeeFilterList';
import './filterList.css';
import ManagerFilterList from './managerFilterList/managerFilterList';
import SortList from './sortList/sortList';
import UsersTypeFilter from './usersTypeFilter/usersTypeFilter';
interface test {
  [key: string]: any;
}
const FilterList = ({ filterObject, setFilterObject, userType, setUserType, setSortType }: { filterObject: test, setFilterObject: Function, userType: string, setUserType: Function, setSortType: Function }) => {
  function setFullNameParam(param: string, value: string | number) {
    if (!filterObject['fullName']) {
      filterObject['fullName'] = {};
    }
    if (typeof value === 'string' && !value.split(' ').join('')) {
      delete filterObject['fullName'][param]
    } else filterObject['fullName'][param] = value;
    return setFilterObject({ ...filterObject });
  }
  function setTimeRange(value: string, keyName: 'startTimeLunch' | 'endTimeLunch' | 'startTimeReception' | 'endTimeReception', index: 'start' | 'end') {
    if (!filterObject[keyName]) {
      if (index === 'start') return setFilterObject({ ...filterObject, [keyName]: `${value}-` })
      else if (index === 'end') return setFilterObject({ ...filterObject, [keyName]: `-${value}` })
    } else {
      if (index === 'start') {
        const timeValues = filterObject[keyName].split('-');
        timeValues[0] = value;
        filterObject[keyName] = timeValues.join('-');
        return setFilterObject({ ...filterObject });
      } else {
        const timeValues = filterObject[keyName].split('-');
        timeValues[1] = value;
        filterObject[keyName] = timeValues.join('-');
        return setFilterObject({ ...filterObject });
      }
    }
  }

  function setPrimitiveFilterParam(param: string, value: string | number) {
    if (!String(value).split(' ').join('')) {
      delete filterObject[param]
    } else filterObject[param] = value;
    return setFilterObject({ ...filterObject });
  }
  function clearTimeRange(inputsClassName: string, filterPropName: "startTimeLunch" | "endTimeLunch" | "startTimeReception" | "endTimeReception") {
    setPrimitiveFilterParam(filterPropName, '');
    document.querySelectorAll(`.${inputsClassName}`).forEach((timeinput: any) => timeinput.value = '');
  }
  return (
    <article className="filter-list__wrapper">
      <CommonParamsFilterList setFullNameParam={setFullNameParam} setPrimitiveFilterParam={setPrimitiveFilterParam} />
      <UsersTypeFilter setUserType={setUserType} />
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
      <SortList setSortType={setSortType} />
    </article>
  )
}
export default FilterList;