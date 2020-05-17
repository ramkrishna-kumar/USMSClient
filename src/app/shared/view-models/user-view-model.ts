import { UserType } from 'src/app/shared/enums/user-type';

export class UserViewModel {
    constructor() {}
    public id:number;
    public username: string;
    public password: string;
    public userType: UserType;
    public isEnabled: boolean;
    public createdByUserId: number;

    public name: string;
    public address: string;
    public city: string;
    public state: string;
    public country: string;
    public email: string;
    public mobileNumber: string;
    public emergencyContactNumber: string;
    public colllegeId: number;

    public colllegeName: string;
    public userTypeName: string;
    public createdByUserName: string;

    public dateCreated: Date;
    public lastModified: Date;
}