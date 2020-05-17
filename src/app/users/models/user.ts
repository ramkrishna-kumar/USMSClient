import { UserType } from '../../shared/enums/user-type';

export class User {

    constructor() { }
    
    // Login details
    userId: number;
    userName: string;
    password: string;
    userType: UserType;
    isEnabled: boolean;
    
    // Personal details
    fullName: string;
    village: string;
    city: string;
    state: string;
    country: string;
    mobile: string;
    
    // Professional details
    collegeId: number[];
    departmentId: number[];
  }
  