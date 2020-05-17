import { UserType } from 'src/app/shared/enums/user-type';

export class UserContext {
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
    public clllegeId: number;
    public clllegeName: string

    public dateCreated: Date;
    public lastModified: Date;
}