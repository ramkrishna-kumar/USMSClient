import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";

import { WebStoreService } from './web-store.service';
import { RequestUtilities } from '../utilities/request-utility';
import { UserViewModel } from '../view-models/user-view-model';
import { UserType } from '../enums/user-type';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public loginRedirectUrl: string;
  public logoutRedirectUrl: string;

  constructor(private router: Router, private webStore: WebStoreService) {
  }

  gotoPage(page: string, preserveParams = true) {

    let navigationExtras: NavigationExtras = {
      queryParamsHandling: preserveParams ? "merge" : "", preserveFragment: preserveParams
    };
    this.router.navigate([page], navigationExtras);
  }

  redirectLoginUser() {
    let redirect = this.loginRedirectUrl && this.loginRedirectUrl != '/' && this.loginRedirectUrl != '/login' ? this.loginRedirectUrl : '/';
    this.loginRedirectUrl = null;

    let urlParamsAndFragment = RequestUtilities.splitInTwo(redirect, '#');
    let urlAndParams = RequestUtilities.splitInTwo(urlParamsAndFragment.firstPart, '?');

    let navigationExtras: NavigationExtras = {
      fragment: urlParamsAndFragment.secondPart,
      queryParams: RequestUtilities.getQueryParamsFromString(urlAndParams.secondPart),
      queryParamsHandling: "merge"
    };

    this.router.navigate([urlAndParams.firstPart], navigationExtras);
  }

  redirectLogoutUser() {
    let redirect = this.logoutRedirectUrl ? this.logoutRedirectUrl : '/login';
    this.logoutRedirectUrl = null;

    this.router.navigate([redirect]);
  }

  redirectForLogin() {
    this.router.navigate(['/login']);
  }

  reLogin() {
    if (!this.isLoggedIn) {
      this.redirectForLogin();
    }
    else if (this.router.url === '/dashboard') {
      this.webStore.deleteAll();
      this.loginRedirectUrl = null;
      this.logout();
      this.redirectForLogin();
    }
    else {
      this.webStore.deleteAll();
      this.router.navigate(['/dashboard']);
    }
  }

  logout(): void {
    this.webStore.delete('user_token');
    this.webStore.delete('user_token_expiry');
    this.webStore.delete('user');
    this.webStore.deleteAll();
  }

  get hasCurrentUser(): boolean {
    return this.webStore.get<UserViewModel>('user') != null;
  }

  get currentUser(): UserViewModel {

    let ucx = this.webStore.get<UserViewModel>('user');
    if (!ucx) {
      this.redirectForLogin();
      return null;
    }
    return ucx;
  }

  saveCurrentUser() {

    let ucx = this.webStore.get<UserViewModel>('user');
    if (!ucx) {
      this.redirectForLogin();
      return null;
    }
    let isRemember = this.webStore.get<Boolean>("user_remember_me");
    if (isRemember) {
      this.webStore.saveInLocalStorage('user', ucx);
    }
    else {
      this.webStore.saveInSessionStorage('user', ucx);
    }
  }

  get tokenForHeader(): string {
    var theToken = this.webStore.get<string>('user_token');
    if (!theToken) {
      return "";
    }
    return theToken;
  }

  get token(): string {
    var theToken = this.webStore.get<string>('user_token');
    if (!theToken) {
      this.reLogin();
    }
    return theToken;
  }

  get tokenExpiryDate(): Date {

    return this.webStore.get<Date>('user_token_expiry');
  }


  get isSessionExpired(): boolean {

    let expiry: Date = this.tokenExpiryDate;

    if (!expiry) {
      return true;
    }

    return (expiry.valueOf() < new Date().valueOf());
  }

  get isLoggedInWithoutRedirect(): boolean {
    let ucx = this.webStore.get<UserViewModel>('user');
    if (ucx) {
      return true;
    }
    else {
      return false;
    }
  }

  get isLoggedIn(): boolean {
    return this.currentUser != null;
  }


  get rememberMe(): boolean {
    return this.webStore.get<boolean>('user_remember_me') == true;
  }



  public get isUniversityAdmin(): boolean {
    return this.currentUser && this.currentUser.userType == UserType.UniversityAdmin;
  }

  public get isUniversityStaff(): boolean {
    return this.currentUser && this.currentUser.userType == UserType.UniversityStaff;
  }

  public get isCollegeAdmin(): boolean {
    return this.currentUser && this.currentUser.userType == UserType.CollegeAdmin;
  }

  public get isCollegeStaff(): boolean {
    return this.currentUser && this.currentUser.userType == UserType.CollegeStaff;
  }

  public get isSupplier(): boolean {
    return this.currentUser && this.currentUser.userType == UserType.Supplier;
  }

}

