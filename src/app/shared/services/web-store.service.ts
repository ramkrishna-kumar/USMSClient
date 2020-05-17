import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class WebStoreService {

  constructor(private localStorage: LocalStorageService, private sessionStorage: SessionStorageService) { }

  removeFromLocalStorage(key: string) {
    this.localStorage.clear(key);
  }

  removeFromSessionStorage(key: string) {
    this.sessionStorage.clear(key);
  }

  getFromLocalStorage<T>(key: string): T {
    return this.localStorage.retrieve(key);
  }

  getFromSessionStorage<T>(key: string): T {
    return this.localStorage.retrieve(key);
  }

  saveInLocalStorage(key: string, value: any) {
    this.localStorage.store(key, value);
  }

  saveInSessionStorage(key: string, value: any) {
    this.localStorage.store(key, value);
  }

  get<T>(key: string): T {
    let val: T = this.localStorage.retrieve(key);
    if (!val) {
      return this.sessionStorage.retrieve(key);
    }
    return val;
  }

  exists(key: string): boolean {
    let val = this.localStorage.retrieve(key);
    if (!val) {
      val = this.sessionStorage.retrieve(key);
      if (!val) {
        return false;
      }
    }
    return true;
  }

  delete(key: string) {
    this.removeFromLocalStorage(key);
    this.removeFromSessionStorage(key);
  }

  deleteAll() {
    this.delete("currentDirectoryId");
    this.delete("searchString");
    this.delete("selectedServerOrCluster");
    this.delete("filterFormDataState");    
  }
}
