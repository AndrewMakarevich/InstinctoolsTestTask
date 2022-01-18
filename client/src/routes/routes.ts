import MainPage from "../pages/mainPage/mainPage";
import { HOME_PAGE_ROUTE } from "./consts";

export const publicRoutes = [
    {
        name: 'Home',
        path: HOME_PAGE_ROUTE,
        component: MainPage
    }
];