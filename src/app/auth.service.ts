import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logggedInStatus: boolean = false;
  loggedInUser: string;

  public login(getUser: string): void {
    this.logggedInStatus = !this.logggedInStatus;
    this.loggedInUser = getUser;
  }

  public logOut(): void {
    this.logggedInStatus = !this.logggedInStatus;
    this.loggedInUser = "";
  }
}
