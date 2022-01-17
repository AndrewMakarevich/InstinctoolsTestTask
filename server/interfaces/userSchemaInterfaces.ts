export interface IUserFullName {
    [key: string]: string,
    name: string,
    surname: string,
    patronymic: string
}

export interface IUser {
    [key: string]: string | IUserFullName | number | undefined,
    fullName: IUserFullName,
    salary: number
    photo?: string
}
export interface IEmployee extends IUser {
    workPlaceNumber: number
    startTimeLunch: string,
    endTimeLunch: string
}
export interface IManager extends IUser {
    startTimeReception: string,
    endTimeReception: string
}

export interface IintermediatePropObj {
    [key: string]: any,
    // [Symbol.iterator](): Iterator<Object>
}