import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'chat-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  firstNameValue: string = "";
  lastNameValue: string = "";
  
  validateLogin(): void {
    this.http.get('https://dummyjson.com/users').subscribe((response: any) => {
      const users = response["users"];
      for (const user of users) {
        if (user["firstName"] == this.firstNameValue && user["lastName"] == this.lastNameValue) {
          console.log("yey")
        }
      };

    }, (error) => {
      console.error(error);
    });
  }
}
