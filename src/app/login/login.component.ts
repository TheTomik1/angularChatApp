import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  firstNameValue: string = "";
  lastNameValue: string = "";
  loginTime: Date;
  
  validateLogin(): void {
    this.http.get('https://dummyjson.com/users').subscribe((response: any) => {
      const users = response["users"];
      for (const user of users) {
        if (user["firstName"] == this.firstNameValue && user["lastName"] == this.lastNameValue) {
          this.authService.login(user["firstName"]+user["lastName"]);
          this.router.navigate(['chat']);
          this.loginTime = new Date();
          console.log(this.loginTime)
          return;
        }
      };

      alert("This user has not been found!");
    }, (error) => {
      console.error(error);
    });
  }
}