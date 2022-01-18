import { $host } from ".";
import { IgetUsersResponse } from "../interfaces/userResponseInterfaces";
export const getUsers = async (pageQuery: number = 1, filterQuery: string = '{}') => {
    console.log(process.env.REACT_APP_SERVER_API_URL);
    const response = await $host.get<IgetUsersResponse>(`/user/get?page=${pageQuery}&filter=${filterQuery}`);
    return response.data;
}