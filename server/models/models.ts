
import { Schema, model } from 'mongoose';
import { IUser, IManager, IEmployee } from '../interfaces/userSchemaInterfaces';

// SCHEMAS
const UserShema = new Schema<IUser>({
    fullName: {
        name: { type: String, required: true, trim: true },
        surname: { type: String, required: true, trim: true },
        patronymic: { type: String, required: true, trim: true }
    },
    salary: { type: Number, default: 0, min: 0 },
    photo: String
});

const EmployeeShema = new Schema<IEmployee>({
    ...UserShema.obj,
    workPlaceNumber: { type: Number, required: true, default: 0 },
    startTimeLunch: { type: String, required: true, validate: /^(([0-1][0-9])|([0-2][0-3])):[0-5][0-9]$/ },
    endTimeLunch: { type: String, required: true, validate: /^(([0-1][0-9])|([0-2][0-3])):[0-5][0-9]$/ }
}, { timestamps: true });


const ManagerShema = new Schema<IManager>({
    ...UserShema.obj,
    startTimeReception: { type: String, required: true, validate: /^(([0-1][0-9])|([0-2][0-3])):[0-5][0-9]$/ },
    endTimeReception: { type: String, required: true, validate: /^(([0-1][0-9])|([0-2][0-3])):[0-5][0-9]$/ }
}, { timestamps: true });

// MODELS
export const EmployeeModel = model<IEmployee>('Employee', EmployeeShema);
export const ManagerModel = model<IManager>('Manager', ManagerShema);
