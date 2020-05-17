import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class EndpointBase {

  private _authService: AuthenticationService;

  private get authService() {
    if (!this._authService)
      this._authService = this.injector.get(AuthenticationService);

    return this._authService;
  }

  constructor(protected http: HttpClient, protected injector: Injector) {

  }

  protected get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, this.getRequestHeaders()).pipe<T>(catchError(error => this.handleUnauthorized(error)));
  }

  protected getBlob(url: string): Observable<any> {
    return this.http.get(url, this.getRequestStreamHeaders()).pipe<any>(catchError(error => this.handleUnauthorized(error)));
  }

  protected getPlainText(url: string): Observable<string> {
    return this.http.get(url, this.getRequestTextHeaders()).pipe<string>(catchError(error => this.handleUnauthorized(error)));
  }

  protected delete(url: string): Observable<any> {
    return this.http.delete(url, this.getRequestHeaders()).pipe(catchError(error => this.handleUnauthorized(error)));
  }
  
  protected post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data ? JSON.stringify(data) : null, this.getRequestHeaders()).pipe<T>(catchError(error => this.handleUnauthorized(error)));
  }

  protected postRaw<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data, this.getRequestHeaders()).pipe<T>(catchError(error => this.handleUnauthorized(error)));
  }

  protected put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(url, data ? JSON.stringify(data) : null, this.getRequestHeaders()).pipe<T>(catchError(error => this.handleUnauthorized(error)));
  }

  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    let headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.authService.tokenForHeader,
      'Content-Type': 'application/json',
      'Accept': `application/json, application/xml, text/x-json, text/javascript, text/xml`
    });

    return { headers: headers };
  }    
                                         
  protected getRequestStreamHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; }; responseType: "blob"; } {
    let headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.authService.tokenForHeader,
      'Content-Type': 'application/octet-stream',
      'Accept': `application/octet-stream`
    });

    return { headers: headers, responseType: "blob" };
  }

  protected getRequestTextHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; }; responseType: "text"; } {
    let headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.authService.tokenForHeader,
      'Content-Type': 'application/json',
      'Accept': `text/plain`
    });

    return { headers: headers, responseType: "text" };
  }

  
  protected handleUnauthorized(error) {

    if (error.status == 401) {      
      this.authService.reLogin();
      return;
    }        
    return throwError(error);    
  }  
}
