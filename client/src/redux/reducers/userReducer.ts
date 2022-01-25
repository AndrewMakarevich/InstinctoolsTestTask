import { UserAction, IUserStoreState } from "../../interfaces/userStoreInterfaces";
export enum UserStoreActions {
    CHANGE_USER_TYPE = "CHANGE_USER_TYPE",
    CHANGE_SORT_TYPE = "CHANGE_SORT_TYPE",
    CHANGE_FILTER_OBJECT = "CHANGE_FILTER_OBJECT",
    CHANGE_CURRENT_PAGE = "CHANGE_CURRENT_PAGE",
    SET_USERS_DATA = "SET_USERS_DATA"
}
const defaultState: IUserStoreState = {
    userType: "all",
    sortType: '{}',
    filterObj: {},
    currentPage: 1,
    usersData: {
        result: [],
        elementsTotal: 0,
        currentPage: 1,
        pageQty: 1
    }
}

const userReducer = (state: IUserStoreState = defaultState, action: UserAction): IUserStoreState => {
    switch (action.type) {
        case UserStoreActions.CHANGE_USER_TYPE:
            return { ...state, userType: action.payload };
        case UserStoreActions.CHANGE_SORT_TYPE:
            return { ...state, sortType: action.payload };
        case UserStoreActions.CHANGE_FILTER_OBJECT:
            return { ...state, filterObj: action.payload };
        case UserStoreActions.CHANGE_CURRENT_PAGE:
            return { ...state, currentPage: action.payload };
        case UserStoreActions.SET_USERS_DATA:
            return { ...state, usersData: action.payload };
        default:
            return state;
    }
}
export default userReducer;