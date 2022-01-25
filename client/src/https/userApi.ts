import { $host } from ".";
import { IgetUsersResponse, IcreateUserResponse } from "../interfaces/userResponseInterfaces";
export const getUsers = async (pageQuery: number = 1, filterQuery: string = '{}', userType: string = 'all', sort: string = '{}') => {
    const response = await $host.get<IgetUsersResponse>(`/user/get?type=${userType}&filter=${filterQuery}&sort=${sort}&page=${pageQuery}&limit=5`);
    return response.data;
}
export const createUser = async (userType: 'employee' | 'manager', formData: FormData) => {
    const response = await $host.post<IcreateUserResponse>(`/user/create/${userType}`, formData);
    return response.data;
}