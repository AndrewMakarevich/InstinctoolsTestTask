
import ApiError from "../apiError/apiError";
import { IintermediatePropObj, IManager, IUserFullName } from "../interfaces/userSchemaInterfaces";
import { EmployeeModel, ManagerModel } from '../models/models'
import fileUpload from 'express-fileupload'
import path from 'path';
import fs from 'fs';
const uuid = require('uuid');

class UserService {
    private uploadPhoto(pathToFoldier: string, photo?: fileUpload.UploadedFile): string | undefined {
        if (photo) {
            try {
                const photoName = `${uuid.v4()}.jpg`;
                photo.mv(path.resolve(__dirname, '..', 'static', pathToFoldier, photoName));
                return photoName;
            } catch (e) {
                throw ApiError.badRequest((<Error | ApiError>e).message)
            }
        }
        return undefined;
    }
    async getUsers(type: string, filterObj: IintermediatePropObj, page: number, limit: number) {
        if (!(type === "employee" || type === "manager" || type === "all")) {
            throw ApiError.badRequest('Incorrect query "type" param, allowable param values: employee, manager, all');
        }
        const filterProps: IintermediatePropObj = {
        };
        function createFilterObj(obj: IintermediatePropObj, setToObj: IintermediatePropObj, keyName?: string) {
            for (let key in obj) {
                if (typeof obj[key] === "object") {
                    const newKeyName = keyName ? `${keyName}${key}.` : `${key}.`;
                    createFilterObj(obj[key], setToObj, newKeyName);
                    continue;
                } else {
                    let newKeyName = keyName ? `${keyName}${key}` : key;
                    const rangeArray = `${obj[key]}`.split('|');
                    if (rangeArray.length === 2) {
                        return setToObj[newKeyName] = { $gte: rangeArray[0], $lte: rangeArray[1] };
                    }
                    return setToObj[newKeyName] = { $regex: obj[key], $options: 'i' };
                }
            }
        }
        createFilterObj(filterObj, filterProps);
        // console.log(filterProps);
        let result;
        let skipValue = limit * (page - 1);
        switch (type) {
            case 'employee':
                result = {
                    result: await EmployeeModel.find(filterProps).skip(skipValue).limit(limit),
                    elementsTotal: await EmployeeModel.find(filterProps).count(),
                    currentPage: page,
                    pageQty: Math.ceil(await EmployeeModel.find(filterProps).count() / limit)
                };
                break;
            case 'manager':
                result = {
                    result: await ManagerModel.find(filterProps).skip(skipValue).limit(limit),
                    elementsTotal: await ManagerModel.find(filterProps).count(),
                    currentPage: page,
                    pageQty: Math.ceil(await ManagerModel.find(filterProps).count() / limit)
                };
                break;
            case 'all':
                const managers = await ManagerModel.find(filterProps);
                const employees = await EmployeeModel.find(filterProps);;
                const resArray = [...employees, ...managers];
                result = {
                    result: resArray.slice(skipValue, skipValue + limit),
                    elementsTotal: resArray.length,
                    currentPage: page,
                    pageQty: Math.ceil(resArray.length / Number(limit))
                }
                break;
        }
        return result;
    }
    async createEmployee(fullName: string, salary: number, photo: fileUpload.UploadedFile, workPlaceNumber: number, startTimeLunch: string, endTimeLunch: string) {
        if (!fullName || !salary || !workPlaceNumber || !startTimeLunch || !endTimeLunch) {
            throw ApiError.badRequest('Not enough data');
        }
        await EmployeeModel.create({
            fullName: JSON.parse(fullName),
            salary,
            photo: this.uploadPhoto('avatar', photo),
            workPlaceNumber,
            startTimeLunch,
            endTimeLunch
        });
        return { message: 'Employee created successfully' }
    }
    async createManager(fullName: string, salary: number, photo: fileUpload.UploadedFile, startTimeReception: string, endTimeReception: string) {
        if (!fullName || !salary || !startTimeReception || !endTimeReception) {
            throw ApiError.badRequest('Not enough data');
        }
        await ManagerModel.create({
            fullName: JSON.parse(fullName),
            salary,
            photo: this.uploadPhoto('avatar', photo),
            startTimeReception,
            endTimeReception
        });

        return { message: 'Manager created successfully' }
    }
    async deleteEmployee(id: string) {
        const employee = await EmployeeModel.findById({ _id: id });
        if (!employee) {
            throw ApiError.badRequest('There is no such employee');
        }
        await EmployeeModel.deleteOne({ _id: id });
        if (employee.photo) {
            fs.unlink(path.resolve(__dirname, "..", "static", "avatar", employee.photo), () => { })
        }

        return { message: 'Employee deleted succesfully' }
    }
    async deleteManager(id: string) {
        const manager = await ManagerModel.findById({ _id: id });
        if (!manager) {
            throw ApiError.badRequest('There is no such manager');
        }
        await ManagerModel.deleteOne({ _id: id });
        if (manager.photo) {
            fs.unlink(path.resolve(__dirname, "..", "static", "avatar", manager.photo), () => { })
        }
        return { message: 'Manager deleted succesfully' }
    }
    async editEmployee(id: string, fullName: string, salary: number, photo: fileUpload.UploadedFile, workPlaceNumber: number, startTimeLunch: string, endTimeLunch: string) {
        const employee = await EmployeeModel.findById(id);
        const updateObj: IintermediatePropObj = {
            salary,
            photo: this.uploadPhoto('avatar', photo),
            workPlaceNumber,
            startTimeLunch,
            endTimeLunch
        };
        if (employee?.photo && photo) {
            fs.unlink(path.resolve(__dirname, "..", "static", "avatar", employee.photo), () => { })
        }
        if (fullName) {
            const fullNameObj: IUserFullName = JSON.parse(fullName);
            Object.keys(fullNameObj).forEach(key => {
                return updateObj[`fullName.${key}`] = fullNameObj[key]
            });
        }

        await EmployeeModel.findByIdAndUpdate({ _id: id }, updateObj);
        return { message: 'Employee updated succesfully' }
    }
    async editManager(id: string, fullName: string, salary: number, photo: fileUpload.UploadedFile, startTimeReception: string, endTimeReception: string) {
        const manager = await ManagerModel.findById(id);
        const updateObj: IintermediatePropObj = {
            salary,
            photo: this.uploadPhoto('avatar', photo),
            startTimeReception,
            endTimeReception
        };
        if (manager?.photo && photo) {
            fs.unlink(path.resolve(__dirname, "..", "static", "avatar", manager.photo), () => { })
        }
        if (fullName) {
            const fullNameObj: IUserFullName = JSON.parse(fullName);
            Object.keys(fullNameObj).forEach(key => {
                return updateObj[`fullName.${key}`] = fullNameObj[key]
            });
        }

        await ManagerModel.findByIdAndUpdate({ _id: id }, updateObj);
        return { message: 'Manager updated succesfully' }
    }
}
export default new UserService();