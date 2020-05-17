import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { WebStoreService } from '../services/web-store.service';
import { OpenIdConfigs } from '../models/open-id-config';
import { LoginResponse } from '../models/login-response';
import { UserViewModel } from '../view-models/user-view-model';
import { TempServiceProvider } from './temp-service-provider';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private authService: AuthenticationService, private webStore: WebStoreService, private tempService: TempServiceProvider) { }

  getOpenIdServices() {
    let endpointUrl = `/api/auth/openid/services`;
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': `application/json, application/xml, text/x-json, text/javascript, text/xml`
    });
    return this.http.get<OpenIdConfigs>(endpointUrl, { headers: header });
  }

  public tempLogin(username: string, password: string, rememberMe?: boolean) {
    if(this.tempService) {
      let model = this.tempService.getLoginResponse();
      return this.processLoginResponse(model, rememberMe)
    }
  }

  login(username: string, password: string, rememberMe?: boolean): Observable<UserViewModel> {
    if (this.authService.isLoggedIn)
      this.authService.logout();

    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    let requestBody = `{\"username\": \"${username}\", \"password\": \"${password}\", \"IsKeepMeLoggedIn\": \"${rememberMe}\" }`;
    return this.http.post<LoginResponse>('/api/auth/login', requestBody, { headers: header }).pipe(map(response => this.processLoginResponse(response, rememberMe)));
  }

  loginWithAzureIdToken(idToken: string): Observable<UserViewModel> {

    if (this.authService.isLoggedIn)
      this.authService.logout();

    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    let requestBody = `{\"idToken\": \"${idToken}\"}`;
    return this.http.post<LoginResponse>('/api/auth/login/azure/token', requestBody, { headers: header }).pipe(map(response => this.processLoginResponse(response, false)));
  }

  loginWithGoogleIdToken(idToken: string): Observable<UserViewModel> {

    if (this.authService.isLoggedIn)
      this.authService.logout();

    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    let requestBody = `{\"idToken\": \"${idToken}\"}`;
    return this.http.post<LoginResponse>('/api/auth/login/google/token', requestBody, { headers: header }).pipe(map(response => this.processLoginResponse(response, false)));
  }

  private processLoginResponse(response: LoginResponse, rememberMe: boolean) {

    let token = response.token;

    if (token == null)
      throw new Error("Received token was empty");

    let tokenExpiryDate = response.expiry;

    let ucx = response.userContext;

    this.saveUserContext(ucx, token, tokenExpiryDate, rememberMe);

    return ucx;
  }

  private saveUserContext(ucx: UserViewModel, token: string, tokenExpiryDate: Date, rememberMe: boolean) {

    if (rememberMe) {
      this.webStore.saveInLocalStorage("user_token", token);
      this.webStore.saveInLocalStorage("user_token_expiry", tokenExpiryDate);
      this.webStore.saveInLocalStorage("user", ucx);
      let u: UserViewModel = this.webStore.getFromLocalStorage("user");
    }
    else {
      this.webStore.saveInSessionStorage("user_token", token);
      this.webStore.saveInSessionStorage("user_token_expiry", tokenExpiryDate);
      this.webStore.saveInSessionStorage("user", ucx);
    }

    this.webStore.saveInLocalStorage("user_remember_me", rememberMe);
  }

}
