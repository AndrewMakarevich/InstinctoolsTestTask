import { Model, Mongoose } from "mongoose";
import ApiError from "../apiError/apiError";
import { IUserFullName } from "../interfaces/userSchemaInterfaces";
import { EmployeeModel, ManagerModel } from '../models/models'

class UserService {
    async getUsers(type: string) {
        if (!(type === "employee" || type === "manager" || type === "all")) {
            throw ApiError.badRequest('Incorrect query "type" param, allowable param values: employee, manager, all');
        }
        let result;
        switch (type) {
            case 'employee':
                result = await EmployeeModel.find();
                break;
            case 'manager':
                result = await ManagerModel.find();
                break;
            case 'all':
                const managers = await ManagerModel.find();
                const employees = await EmployeeModel.find();
                console.log(...managers);
                result = { employees, managers }
                break;
        }
        return result;
    }
    async createEmployee(fullName: IUserFullName, salary: number, photo: string, workPlaceNumber: number, startTimeLunch: string, endTimeLunch: string) {
        if (!fullName || !salary || !workPlaceNumber || !startTimeLunch || !endTimeLunch) {
            throw ApiError.badRequest('Not enough data');
        }
        await EmployeeModel.create({
            fullName,
            salary,
            photo,
            workPlaceNumber,
            startTimeLunch,
            endTimeLunch
        });
        return { message: 'Employee created successfully' }
    }
    async createManager(fullName: IUserFullName, salary: number, photo: string, startTimeReception: string, endTimeReception: string) {
        if (!fullName || !salary || !startTimeReception || !endTimeReception) {
            throw ApiError.badRequest('Not enough data');
        }
        await ManagerModel.create({
            fullName,
            salary,
            photo,
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
        return { message: 'Employee deleted succesfully' }
    }
    async deleteManager(id: string) {
        const manager = await ManagerModel.findById({ _id: id });
        if (!manager) {
            throw ApiError.badRequest('There is no such manager');
        }
        await ManagerModel.deleteOne({ _id: id });
        return { message: 'Manager deleted succesfully' }
    }
}
export default new UserService();