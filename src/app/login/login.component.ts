import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NotificationService } from '../shared/services/notification.service';
import { LoginService } from '../shared/services/login.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { OpenIdConfigs } from '../shared/models/open-id-config';
import { UserLogin } from '../shared/models/user-login';
import { map } from 'rxjs/operators';
import { RequestUtilities } from '../shared/utilities/request-utility';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin = new UserLogin();
  public auth2: any;

  fragments: any;
  openIdConfigs: OpenIdConfigs;

  isMicrosoftEnabled: boolean = false;
  isGoogleEnabled: boolean = false;

  @ViewChild('googleBtn', { static: true }) el: ElementRef;

  constructor(private zone: NgZone, private route: ActivatedRoute, private notificationService: NotificationService,
    private authenticationService: AuthenticationService, private loginService: LoginService) {

    if (this.getShouldRedirect()) {
      this.authenticationService.redirectLoginUser();
    }

    this.userLogin.rememberMe = this.authenticationService.rememberMe;
    this.getFragment();
  }


  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  servicesLoaded(configs: OpenIdConfigs) {
    this.openIdConfigs = configs;
    this.isMicrosoftEnabled = configs.microsoftConfig.isEnabled;
    this.isGoogleEnabled = configs.googleConfig.isEnabled;
    if (configs.googleConfig.isEnabled) {
      this.googleInit();
    }
    this.checkResponse();
  }

  servicesLoadError(error) {
    this.notificationService.error("Error loading OPen ID Connect services.", error);
  }



  getOpenIdServices() {
    this.loginService.getOpenIdServices().subscribe(services => this.servicesLoaded(services), error => this.servicesLoadError(error));
  }



  getFragment() {
    this.route.fragment
      .pipe(
        map(fragment => new URLSearchParams(fragment)),
        map(params => ({
          id_token: params.get('id_token'),
          error: params.get('error'),
          state: params.get('state'),
          oid: params.get('oid'),
        }))
      )
      .subscribe(res => {
        if (!this.fragments) {
          this.fragments = res;
          this.getOpenIdServices();
        }
      });
  }

  onMicrosoftSignin() {
    if (this.openIdConfigs.microsoftConfig.isEnabled) {

      let loginUrl = `${this.openIdConfigs.microsoftConfig.authority}?client_id=${this.openIdConfigs.microsoftConfig.clientId}&response_type=id_token&scope=openid+profile+email&response_mode=fragment&state=12345&nonce=678910&redirect_uri=${this.openIdConfigs.microsoftConfig.redirectUrl}`;
      document.location.href = loginUrl;
    }
  }

  checkResponse() {

    if (this.fragments.oid) {
      if (this.fragments.oid === "google") {
        gapi.load('auth2', () => {
          this.auth2 = gapi.auth2.init({
            client_id: this.openIdConfigs.googleConfig.clientId,
            cookiepolicy: 'single_host_origin',
            scope: 'profile email',
            ux_mode: 'redirect'
          });
          this.auth2.signIn();
        });
      }
      else if (this.fragments.oid === 'microsoft') {
        this.onMicrosoftSignin();
      }
    }
    else if (this.fragments.error) {
      this.notificationService.error("Error", "Unable to login.", this.fragments.error);
    }
    else if (this.fragments.id_token && this.fragments.state) {
      this.loginService.loginWithAzureIdToken(this.fragments.id_token)
        .subscribe(
          user => {

            if (this.getShouldRedirect()) {
              this.authenticationService.redirectLoginUser();
            }
          },
          error => {
            if (RequestUtilities.checkNoNetwork(error)) {
              this.notificationService.error("No Network", "The server cannot be reached.", error);
            }
            else {

              this.notificationService.error("Error", "Access denied.", error);
            }

            setTimeout(() => {

            }, 500);
          });
    }
    else if (this.fragments.id_token) {
      this.loginService.loginWithGoogleIdToken(this.fragments.id_token)
        .subscribe(
          user => {

            if (this.getShouldRedirect()) {
              this.authenticationService.redirectLoginUser();
            }
          },
          error => {
            if (RequestUtilities.checkNoNetwork(error)) {
              this.notificationService.error("No Network", "The server cannot be reached.", error);
            }
            else {
              this.notificationService.error("Error", "Access denied.", error);
            }
          });
    }
    else {
      if (this.getShouldRedirect()) {
        this.authenticationService.redirectLoginUser();
        return;
      }
    }
  }

  public googleInit() {
    let elem = this.el.nativeElement;
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.openIdConfigs.googleConfig.clientId,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(elem);
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        let idToken = googleUser.getAuthResponse().id_token;

        if (idToken) {
          this.zone.run(() => {
            this.loginService.loginWithGoogleIdToken(idToken)
              .subscribe(
                user => {

                  if (this.getShouldRedirect()) {
                    this.authenticationService.redirectLoginUser();
                  }
                },
                error => {
                  if (RequestUtilities.checkNoNetwork(error)) {
                    this.notificationService.error("No Network", "The server cannot be reached.", error);
                  }
                  else {
                    this.notificationService.error("Error", "Access denied.", error);
                  }
                });
          });
        }

      }, (error) => {
        this.zone.run(() => {
          this.notificationService.error("Error", "Access denied.", error);
        });
      });
  }


  ngOnDestroy() {
  }

  getShouldRedirect() {
    return this.authenticationService.isLoggedIn && !this.authenticationService.isSessionExpired;
  }

  login() {
    if (!this.userLogin.username) {
      this.notificationService.error("Error", "Please enter a username.");
      return;
    }
    if (!this.userLogin.password) {
      this.notificationService.error("Error", "Please enter a password.");
      return;
    }

    var ucx = this.loginService.tempLogin(this.userLogin.username, this.userLogin.password, this.userLogin.rememberMe);
    if (ucx != null) {
      if (this.getShouldRedirect()) {
        this.authenticationService.redirectLoginUser();
      }
    }
    else {
      if (RequestUtilities.checkNoNetwork(null)) {
        this.notificationService.error("No Network", "The server cannot be reached");
      }
      else {

        this.notificationService.error("Error", "Invalid username or password");
      }
    }
  }

  get isLoading() {
    return false;
  }

}
