import { NextFunction, Request, Response } from "express";
import UserService from "../services/userService";

class UserController {
    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const userType = req.query.type;
            const getUsersResponse = await UserService.getUsers(String(userType));
            return res.json(getUsersResponse);
        } catch (e) {
            next(e);
        }
    }
    async createEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            const { fullName, salary, photo, workPlaceNumber, startTimeLunch, endTimeLunch } = req.body;
            const employeeCreateResponse = await UserService.createEmployee(fullName, salary, photo, workPlaceNumber, startTimeLunch, endTimeLunch);
            return res.json(employeeCreateResponse);
        } catch (e) {
            next(e);
        }
    }
    async createManager(req: Request, res: Response, next: NextFunction) {
        try {
            const { fullName, salary, photo, startTimeReception, endTimeReception } = req.body;
            const managerCreateResponse = await UserService.createManager(fullName, salary, photo, startTimeReception, endTimeReception);
            return res.json(managerCreateResponse);
        } catch (e) {
            next(e);
        }
    }
    async editEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            const { fullName, salary, photo, workPlaceNumber, startTimeLunch, endTimeLunch } = req.body;
            const employeeCreateResponse = await UserService.createEmployee(fullName, salary, photo, workPlaceNumber, startTimeLunch, endTimeLunch);
            return res.json(employeeCreateResponse);
        } catch (e) {
            next(e);
        }
    }
    async editManager(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {

        }
    }
    async deleteEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const deleteEmployeeResponse = await UserService.deleteEmployee(id);
            return res.json(deleteEmployeeResponse);
        } catch (e) {
            next(e);
        }
    }
    async deleteManager(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const deleteManagerResponse = await UserService.deleteManager(id);
            return res.json(deleteManagerResponse);
        } catch (e) {
            next(e);
        }
    }
}
export default new UserController();