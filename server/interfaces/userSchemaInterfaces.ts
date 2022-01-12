export interface IUserFullName {
    name: number,
    surname: string,
    patronymic: string
}

export interface IUser {
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