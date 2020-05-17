import { UserType } from 'src/app/shared/enums/user-type';

export class User {

    public id:number;
    public username: string;
    public passwordHash: string;
    public userType: UserType;
    public isEnabled: boolean;

    public createdByUserId: number;
    public dateCreated: Date;
    public lastModified: Date;
    
}