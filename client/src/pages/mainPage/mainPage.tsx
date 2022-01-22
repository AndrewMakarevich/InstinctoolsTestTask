
import './mainPage.css';
import { useEffect, useState, useRef } from "react";
import UsersList from "../../components/usersList/usersList";
import { getUsers } from "../../https/userApi";
import { IgetUsersResponse } from "../../interfaces/userResponseInterfaces";
import PaginationLine from '../../components/pagination/paginationLine';
import FilterList from '../../components/filterList/filterList';
interface stateObject {

    [key: string]: any;
}
const MainPage = () => {
    const [usersData, setUsersData] = useState<IgetUsersResponse>();
    const [filterObject, setFilterObject] = useState<stateObject>({});
    const [currentPage, setCurrentPage] = useState(undefined);
    const [userType, setUserType] = useState('all');
    const [sortType, setSortType] = useState('{}');
    function getUsersData(pageQuery?: number, filterQuery?: string, userType?: string, sort?: string) {
        getUsers(pageQuery, filterQuery, userType, sort).then(data => setUsersData(data));
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
        timeoutSearch.current(filterObject, userType, sortType);
        console.log(filterObject);
    }, [filterObject, userType, sortType]);
    useEffect(() => {
        getUsersData(currentPage, JSON.stringify(filterObject), userType, sortType);
    }, [currentPage])
    return (
        <main className="main-page__wrapper">
            <FilterList filterObject={filterObject} setFilterObject={setFilterObject} userType={userType} setUserType={setUserType} setSortType={setSortType} />
            <UsersList users={usersData?.result} />
            <PaginationLine setCurrentPage={setCurrentPage} pagesQty={usersData?.pageQty} currentPage={usersData?.currentPage} />
        </main>
    )
};
export default MainPage;