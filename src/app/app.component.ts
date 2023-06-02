import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';

@Component({
  selector: 'chat-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private http: HttpClient, private authService: AuthService) {}

  firstNameValue: string = "";
  lastNameValue: string = "";
  
  validateLogin(): void {
    this.http.get('https://dummyjson.com/users').subscribe((response: any) => {
      const users = response["users"];
      for (const user of users) {
        if (user["firstName"] == this.firstNameValue && user["lastName"] == this.lastNameValue) {
          this.authService.login();
        }
      };

    }, (error) => {
      console.error(error);
    });
  }
}
