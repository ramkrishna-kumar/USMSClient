import { Injectable } from '@angular/core';
import { Subject, Observable, from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

declare let alertify: any;
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public isLoading: boolean = false;
  loadingId: any;
  loadingHandle: any;  

  constructor(private toastr: ToastrService) {

  }
  
  showConfirmDialog(message: string, okCallback: () => any, cancelCallback?: () => any) {

    alertify.set({
      labels: {
        ok: "OK",
        cancel: "Cancel"
      },
      buttonReverse: true,
      buttonFocus: "cancel"
    });

    alertify
      .confirm(message, (e) => {
        if (e) {
          okCallback();
        }
        else {
          if (cancelCallback)
            cancelCallback();
        }
      });    
  }
  success(title: string, message: string, timeout: number = 2000) {    
    this.toastr.success(message, title, {
      closeButton: true,
      timeOut: timeout
    });
  }
  info(title: string, message: string) {
    this.toastr.info(message, title, {
      closeButton: true,
      timeOut: 3000
    });
  }
  warning(title: string, message: string, error?: any) {
    if (error) {
      if (error.error) {
        message = (message ? message + " " : "") + (error.error.message || error.error.statusDescription || error.error);
      }
      else {
        message = (message ? message + " " : "") + (error.statusDescription || error.message);
      }
    } 
    this.toastr.warning(this.truncate(message, 1000), title, {
      closeButton: true,      
      timeOut: 7000
    });
  }
  error(title: string, message: string, error?: any) {

    if (error) {
      if (error.error) {
        message = (message ? message + " " : "") + (error.error.message || error.error.statusDescription || error.error);
      }
      else {
        message = (message ? message + " " : "") + (error.statusDescription || error.message);
      }
    }    
    this.toastr.error(this.truncate(message, 1000), title, {
      closeButton: true,
      timeOut: 7000     
    });    
  }
  stickyError(title: string, message: string, error?: any) {    
    if (error) {
      if (error.status && error.status == 404) {
        message = (message ? message + " " : "") + (error.url ? error.url + " not found." : "Not found.");
      }
      else if (error.status && error.status == 400) {
        message = (message ? message + " " : "") + (error.url ? error.url + " request body is not valid." : "Bad request.");
      }
      else if (error.status && error.status == 502) {
        message = "502 Bad Gateway. This may be a temporary error.";
      }
      else if (error.error) {
        if (error.error instanceof Blob) {
          const reader = new FileReader();
          var toaster = this.toastr;
          reader.onload = function () {
            var e: any = reader.result;
            var err: any;
            try {
              err = JSON.parse(e);
            } catch (ex) {
              err = e;
            }
            if (err.message || err.statusDescription || err) {
              if (title === "Error" && message && message.length < 100) {
                title = message;
                message = (err.message || err.statusDescription || err);
              }
              else {
                message = (message ? message + " " : "") + (err.message || err.statusDescription || err);
              }
            }
            else {
              message = (message ? message + " " : "") + (err.message || err.statusDescription || err);
            }            
            toaster.error(message, title, {
              closeButton: true,
              timeOut: 0,
              extendedTimeOut: 0
            });
          }
          reader.readAsText(error.error);
          return;
        }
        else {
          if (error.error.message || error.error.statusDescription || error.error) {
            if (title === "Error" && message && message.length < 100) {
              title = message;
              message = (error.error.message || error.error.statusDescription || error.error);
            }
            else {
              message = (message ? message + " " : "") + (error.error.message || error.error.statusDescription || error.error);
            }
          }
          else {
            message = (message ? message + " " : "") + (error.error.message || error.error.statusDescription || error.error);
          }          
        }        
      }
      else {
        message = (message ? message + " " : "") + (error.statusDescription || error.message);
      }
    }
    this.toastr.error(this.truncate(message, 1000), title, {
      closeButton: true,
      timeOut: 0,
      extendedTimeOut: 0
    });
  }

  truncate(text: string, max: number) {
    return text.substr(0, max - 1) + (text.length > max ? '...' : '');
  }

  stickyWarning(title: string, message: string, error?: any) {
    if (error) {
      if (error.status && error.status == 404) {
        message = (message ? message + " " : "") + (error.url ? error.url + " not found." : "Not found.");
      }
      else if (error.status && error.status == 400) {
        message = (message ? message + " " : "") + (error.url ? error.url + " request body is not valid." : "Bad request.");
      }
      else if (error.error) {
        if (error.error instanceof Blob) {
          const reader = new FileReader();
          var toaster = this.toastr;
          reader.onload = function () {
            var e: any = reader.result;
            var err: any;
            try {
              err = JSON.parse(e);
            } catch (ex) {
              err = e;
            }
            message = (message ? message + " " : "") + (err.message || err.statusDescription || err);
            toaster.error(message, title, {
              closeButton: true,
              timeOut: 0,
              extendedTimeOut: 0
            });
          }
          reader.readAsText(error.error);
          return;
        }
        else {
          message = (message ? message + " " : "") + (error.error.message || error.error.statusDescription || error.error);
        }
      }
      else {
        message = (message ? message + " " : "") + (error.statusDescription || error.message);
      }
    }
    this.toastr.warning(message, title, {
      closeButton: true,
      timeOut: 0,
      extendedTimeOut: 0
    });
  }
}


