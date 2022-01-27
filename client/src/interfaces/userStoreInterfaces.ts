import { UserStoreActions } from '../redux/reducers/userReducer';
import { IgetUsersResponse } from './userResponseInterfaces';
interface IUserStoreTypeAction {
    type: UserStoreActions.CHANGE_USER_TYPE,
    payload: "employee" | "manager" | "all",
};
interface IUserStoreSortAction {
    type: UserStoreActions.CHANGE_SORT_TYPE,
    payload: string
};
interface IUserStoreFilterAction {
    type: UserStoreActions.CHANGE_FILTER_OBJECT,
    payload: Object
};
interface IUserStorePageAction {
    type: UserStoreActions.CHANGE_CURRENT_PAGE,
    payload: number
};
interface IUserStoreDataAction {
    type: UserStoreActions.SET_USERS_DATA,
    payload: IgetUsersResponse
};
interface IUserStoreFetchUsersAction {
    type: UserStoreActions.FETCH_USERS
}
export type UserAction = IUserStoreTypeAction | IUserStoreSortAction | IUserStoreFilterAction | IUserStorePageAction | IUserStoreDataAction | IUserStoreFetchUsersAction;



export interface IUserStoreState {
    userType: "employee" | "manager" | "all",
    sortType: string,
    filterObj: { [key: string]: any },
    currentPage: number,
    usersData: IgetUsersResponse,
    fetchUsers: boolean;

}