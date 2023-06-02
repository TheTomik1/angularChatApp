import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logggedInStatus: boolean = false;

  public login(): void {
    this.logggedInStatus = !this.logggedInStatus;
  }

  public logOut(): void {
    this.logggedInStatus = !this.logggedInStatus;
  }

  public isLoggedIn(): boolean {
    return this.logggedInStatus;
  }
}
