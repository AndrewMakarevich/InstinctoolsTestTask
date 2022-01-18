interface IUsersFullName {
    name: string,
    surname: string,
    patronymic: string
}
interface IUserObj {
    fullName: {
        name: string,
        surname: string,
        patronymic: string
    },
    _id: string,
    salary: number,
    photo: string,
    createdAt: Date,
    updatedAt: Date,
    __v: number
}
export interface IEmployeeObj extends IUserObj {
    [key: string]: string | number | Date | IUsersFullName
    workPlaceNumber: number,
    startTimeLunch: string,
    endTimeLunch: string
}
export interface IManagerObj extends IUserObj {
    [key: string]: string | number | Date | IUsersFullName
    startTimeReception: string,
    endTimeReception: string,
}
export interface IgetUsersResponse {
    result: (IEmployeeObj | IManagerObj)[],
    elementsTotal: number,
    currentPage: number,
    pageQty: number
}