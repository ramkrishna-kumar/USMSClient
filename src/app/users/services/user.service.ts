import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { EndpointBase } from 'src/app/shared/services/endpoint-base.service';
import { UserType } from 'src/app/shared/enums/user-type';
import { User } from '../models/user';
import { College } from 'src/app/shared/models/college';

@Injectable({
  providedIn: 'root'
})
export class UserService extends EndpointBase {

  constructor(protected http: HttpClient, protected injector: Injector) {
    super(http, injector);
  }

  postUser(user: User) {
    return this.post<User[]>(`/api/ticket`, user);
  }

  getUsers(collegeId?: number, userType?: UserType) {
    return this.get<User[]>("/api/user");
  }

  putUser(user: User) {
    return this.put<User[]>(`/api/ticket`, user);
  }

  getColleges(collegeId?: number, userType?: UserType) {
    return this.get<College[]>("/api/college");
  }

  getUsersAndColleges(collegeId?: number, userType?: UserType) {
    return forkJoin(
      this.getUsers(collegeId, userType),
      this.getColleges(collegeId, userType)
    );
  }

}
