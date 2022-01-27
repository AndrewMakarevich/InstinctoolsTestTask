import { $host } from ".";
import { IgetUsersResponse, IcreateUserResponse, IeditUserResponse } from "../interfaces/userResponseInterfaces";
export const getUsers = async (pageQuery: number = 1, filterQuery: string = '{}', userType: string, sort: string = '{}') => {
    console.log(`/user/get?type=${userType}&filter=${filterQuery}&sort=${sort}&page=${pageQuery}&limit=5`);
    const response = await $host.get<IgetUsersResponse>(`/user/get?type=${userType || 'all'}&filter=${filterQuery}&sort=${sort}&page=${pageQuery}&limit=5`);
    return response.data;
}
export const createUser = async (userType: 'employee' | 'manager', formData: FormData) => {
    const response = await $host.post<IcreateUserResponse>(`/user/create/${userType}`, formData);
    return response.data;
}
export const editUser = async (userType: 'employee' | 'manager', userId: string, formData: FormData) => {
    const response = await $host.put<IeditUserResponse>(`/user/edit/${userType}/${userId}`, formData);
    return response.data;
}
export const deleteUser = async (userType: 'employee' | 'manager', userId: string) => {
    const response = await $host.delete<IeditUserResponse>(`/user/delete/${userType}/${userId}`);
    return response.data;
}