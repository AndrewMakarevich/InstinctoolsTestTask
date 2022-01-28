
import './mainPage.css';
import { useEffect, useRef } from "react";
import UsersList from "../../components/usersList/usersList";
import { getUsers } from "../../https/userApi";
import PaginationLine from '../../components/pagination/paginationLine';
import FilterList from '../../components/filterList/filterList';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { UserStoreActions } from '../../redux/reducers/userReducer';
import CreateUserModal from '../../components/modal/createUserModal/createUserModal';
interface stateObject {

    [key: string]: any;
}

const MainPage = () => {
    const dispatch = useDispatch();
    const userStore = useTypedSelector(state => state.user);
    // console.log(userStore);
    function getUsersData(
        pageQuery?: number,
        filterQuery: string = JSON.stringify(userStore.filterObj),
        userType: string = userStore.userType,
        sort: string = userStore.sortType) {
        getUsers(pageQuery, filterQuery, userType, sort)
            .then(data => dispatch({ type: UserStoreActions.SET_USERS_DATA, payload: data }));
    }
    function getUsersWithTimeout() {
        let timeout: ReturnType<typeof setTimeout>;
        return (stateFilterObject: stateObject, userType: string, sortType: string) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                getUsersData(1, JSON.stringify(stateFilterObject), userType, sortType);
            }, 500);

        }
    }
    const timeoutSearch = useRef(getUsersWithTimeout())
    useEffect(() => {
        getUsersData();
    }, []);
    useEffect(() => {
        getUsersData(userStore.currentPage, JSON.stringify(userStore.filterObj), userStore.userType, userStore.sortType);
    }, [userStore.currentPage]);
    useEffect(() => {
        timeoutSearch.current(userStore.filterObj, userStore.userType, userStore.sortType)
    }, [userStore.userType, userStore.filterObj, userStore.sortType]);
    useEffect(() => {
        getUsersData();
    }, [userStore.fetchUsers])
    return (
        <main className="main-page__wrapper">
            <FilterList />
            <CreateUserModal updateUserListFunc={getUsersData} />
            <UsersList users={userStore.usersData.result} />
            <PaginationLine />
        </main>
    )
};
export default MainPage;