import { Injectable } from '@angular/core';
import { UserViewModel } from '../view-models/user-view-model';
import { UserType } from '../enums/user-type';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class TempServiceProvider {

  constructor() { }

  public getLoginResponse(): LoginResponse {
    let loginResponse: LoginResponse = new LoginResponse();
    loginResponse.token = "12ka4-42ka1";
    loginResponse.expiry = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 90));
    loginResponse.signoutUrl = null;
    loginResponse.userContext = this.getUserViewModel();
    return loginResponse;
  }
  
  public getUserViewModel() : UserViewModel {
    let userViewModel: UserViewModel = new UserViewModel();
    userViewModel.id = 1;
    userViewModel.username = "ram";
    userViewModel.password = "ram";
    userViewModel.userType = 0;
    userViewModel.isEnabled = true;
    userViewModel.createdByUserId = 100;
    userViewModel.name = "Ramkrishna Kumar";
    userViewModel.address = "Ghitorni";
    userViewModel.city = "New Delhi";
    userViewModel.state = "Delhi";
    userViewModel.email = "ramkrishna_kumar@hotmail.com";
    userViewModel.mobileNumber = "8800272700";
    userViewModel.emergencyContactNumber = "8800272711";
    userViewModel.colllegeId = 201;
    userViewModel.colllegeName = "Universal Institute of Computr and Technology";
    userViewModel.userTypeName = UserType.UniversityAdmin.toString();
    userViewModel.createdByUserName = "Nisha Kumari";
    userViewModel.dateCreated = new Date();
    userViewModel.lastModified = new Date();
    return userViewModel;
  }
}
