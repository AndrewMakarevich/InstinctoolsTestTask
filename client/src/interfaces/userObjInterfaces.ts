import { IUsersFullName } from "./userResponseInterfaces";

export interface IUserCommonParams {
    [key: string]: IUsersFullName | number
    fullName: {
        name: string,
        surname: string,
        patronymic: string
    },
    salary: number,
}