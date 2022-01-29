
import ApiError from "../apiError/apiError";
import { IEmployee, IintermediatePropObj, IManager, IUserFullName } from "../interfaces/userSchemaInterfaces";
import { EmployeeModel, ManagerModel } from '../models/models'
import fileUpload from 'express-fileupload'
import path from 'path';
import fs from 'fs';
import { ISortQueryObj } from "../interfaces/userQueryInterface";
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
    return process.env.TEMPLATE_AVATAR_NAME;
  }
  async getUsers(type: string, filterObj: IintermediatePropObj, sort: string, page: number, limit: number) {
    if (!(type === "employee" || type === "manager" || type === "all")) {
      throw ApiError.badRequest('Incorrect query "type" param, allowable param values: employee, manager, all');
    }
    const filterProps: IintermediatePropObj = {
    };
    function createFilterObj(obj: IintermediatePropObj, setToObj: IintermediatePropObj, keyName?: string) {
      // console.log(obj);
      for (let key in obj) {
        if (typeof obj[key] === "object") {
          const newKeyName = keyName ? `${keyName}${key}.` : `${key}.`;
          createFilterObj(obj[key], setToObj, newKeyName);
          continue;
        } else {
          let newKeyName = keyName ? `${keyName}${key}` : key;
          const rangeArray = `${obj[key]}`.split('-');
          if (rangeArray.length === 2) {
            if (rangeArray.filter((el) => el === '').length === 0) setToObj[newKeyName] = { $gte: Number(rangeArray[0]), $lte: Number(rangeArray[1]) };
            else rangeArray.filter((el) => el !== '').forEach(el => setToObj[newKeyName] = el);
          } else if (Number(obj[key])) {
            setToObj[newKeyName] = Number(obj[key]);
          } else {
            setToObj[newKeyName] = { $regex: obj[key], $options: 'i' };
          }

        }
      }
    }
    createFilterObj(filterObj, filterProps);
    console.log(filterProps);
    let result;
    let skipValue = limit * (page - 1);
    const querySortObj: ISortQueryObj = JSON.parse(sort);
    switch (type) {
      case 'employee':
        result = {
          result: await EmployeeModel.find(filterProps).sort({ [querySortObj.param]: querySortObj.type }).skip(skipValue).limit(limit),
          elementsTotal: await EmployeeModel.find(filterProps).count(),
          currentPage: page,
          pageQty: Math.ceil(await EmployeeModel.find(filterProps).count() / limit)
        };
        break;
      case 'manager':
        result = {
          //{sort:{param, 1 or -1}}
          result: await ManagerModel.find(filterProps).sort({ [querySortObj.param]: querySortObj.type }).skip(skipValue).limit(limit),
          elementsTotal: await ManagerModel.find(filterProps).count(),
          currentPage: page,
          pageQty: Math.ceil(await ManagerModel.find(filterProps).count() / limit)
        };
        break;
      case 'all':
        // $unionWith  $lookup
        let [usersAmount] = await ManagerModel.aggregate([
          { $unionWith: { coll: 'employees' } },
          { $match: filterProps }
        ]).count('elementsTotal');
        if (!usersAmount) {
          usersAmount = 0;
        }
        const users = await ManagerModel
          .aggregate([
            {
              $unionWith:
                { coll: 'employees' }
            },
            { $match: filterProps }
          ])
          .sort({ [querySortObj.param]: querySortObj.type }).skip(skipValue).limit(limit);
        result = {
          result: users,
          elementsTotal: usersAmount === undefined ? 0 : usersAmount['elementsTotal'],
          currentPage: page,
          pageQty: Math.ceil(usersAmount['elementsTotal'] / Number(limit)) || 0
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
      photo: photo ? this.uploadPhoto('avatar', photo) : undefined,
      workPlaceNumber,
      startTimeLunch,
      endTimeLunch
    };
    if (fullName) {
      const fullNameObj: IUserFullName = JSON.parse(fullName);
      Object.keys(fullNameObj).forEach(key => {
        return updateObj[`fullName.${key}`] = fullNameObj[key]
      });
    }
    if (employee?.photo && photo && employee.photo !== process.env.TEMPLATE_AVATAR_NAME) {
      fs.unlink(path.resolve(__dirname, "..", "static", "avatar", employee.photo), () => { })
    }
    await EmployeeModel.findByIdAndUpdate({ _id: id }, updateObj);
    return { message: 'Employee updated succesfully' }
  }
  async editManager(id: string, fullName: string, salary: number, photo: fileUpload.UploadedFile, startTimeReception: string, endTimeReception: string) {
    const manager = await ManagerModel.findById(id);
    const updateObj: IintermediatePropObj = {
      salary,
      photo: photo ? this.uploadPhoto('avatar', photo) : undefined,
      startTimeReception,
      endTimeReception
    };
    if (fullName) {
      const fullNameObj: IUserFullName = JSON.parse(fullName);
      Object.keys(fullNameObj).forEach(key => {
        return updateObj[`fullName.${key}`] = fullNameObj[key]
      });
    }
    if (manager?.photo && photo && manager.photo !== process.env.TEMPLATE_AVATAR_NAME) {
      fs.unlink(path.resolve(__dirname, "..", "static", "avatar", manager.photo), () => { })
    }
    await ManagerModel.findByIdAndUpdate({ _id: id }, updateObj);
    return { message: 'Manager updated succesfully' }
  }
}
export default new UserService();