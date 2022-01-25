import { NextFunction, Request, Response } from "express";
import UserService from "../services/userService";
import fileUpload from 'express-fileupload';


class UserController {
    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const userType = req.query.type || 'all';
            const filterParams = req.query.filter || "{}";
            const sort = req.query.sort === undefined || req.query.sort === "{}" ? '{"param":"fullName.name", "type":1}' : req.query.sort;
            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            const getUsersResponse = await UserService.getUsers(String(userType), JSON.parse(filterParams as string), String(sort), Number(page), Number(limit));
            return res.json(getUsersResponse);
        } catch (e) {
            next(e);
        }
    }
    async createEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            const photo: fileUpload.UploadedFile = req.files?.photo as fileUpload.UploadedFile;
            const { fullName, salary, workPlaceNumber, startTimeLunch, endTimeLunch } = req.body;
            const employeeCreateResponse = await UserService.createEmployee(fullName, salary, photo, workPlaceNumber, startTimeLunch, endTimeLunch);
            return res.json(employeeCreateResponse);
        } catch (e) {
            next(e);
        }
    }
    async createManager(req: Request, res: Response, next: NextFunction) {
        try {
            const photo: fileUpload.UploadedFile = req.files?.photo as fileUpload.UploadedFile;
            const { fullName, salary, startTimeReception, endTimeReception } = req.body;
            console.log({ fullName, salary, startTimeReception, endTimeReception });
            const managerCreateResponse = await UserService.createManager(fullName, salary, photo, startTimeReception, endTimeReception);
            return res.json(managerCreateResponse);
        } catch (e) {
            next(e);
        }
    }
    async editEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const photo: fileUpload.UploadedFile = req.files?.photo as fileUpload.UploadedFile;
            const { fullName, salary, workPlaceNumber, startTimeLunch, endTimeLunch } = req.body;
            const employeeEditResponse = await UserService.editEmployee(id, fullName, salary, photo, workPlaceNumber, startTimeLunch, endTimeLunch);
            return res.json(employeeEditResponse);
        } catch (e) {
            next(e);
        }
    }
    async editManager(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const photo: fileUpload.UploadedFile = req.files?.photo as fileUpload.UploadedFile;
            const { fullName, salary, startTimeReception, endTimeReception } = req.body;
            const managerEditResponse = await UserService.editManager(id, fullName, salary, photo, startTimeReception, endTimeReception);
            return res.json(managerEditResponse);
        } catch (e) {
            next(e)
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