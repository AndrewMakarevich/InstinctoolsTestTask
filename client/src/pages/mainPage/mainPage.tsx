import './mainPage.css';
import { useEffect, useState } from "react";
import UsersList from "../../components/usersList/usersList";
import { getUsers } from "../../https/userApi";
import { IgetUsersResponse } from "../../interfaces/userResponseInterfaces";
import PaginationLine from '../../components/pagination/paginationLine';

const MainPage = () => {
    const [usersData, setUsersData] = useState<IgetUsersResponse>();
    function getUsersData(pageQuery?: number, filterQuery?: string) {
        getUsers(pageQuery, filterQuery).then(data => setUsersData(data));
    }
    useEffect(() => {
        getUsersData();
    }, []);
    return (
        <main className="main-page__wrapper">
            MAIN PAGE
            <UsersList users={usersData?.result} />
            <PaginationLine loadPageFunc={getUsersData} pagesQty={usersData?.pageQty} currentPage={usersData?.currentPage} />
        </main>
    )
};
export default MainPage;