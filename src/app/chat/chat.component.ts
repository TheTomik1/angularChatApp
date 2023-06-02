import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  users = [];

  constructor(private http: HttpClient) {
    this.getUsersData();
  }

  getUsersData(): void {
    this.http.get<any[]>('https://dummyjson.com/users').subscribe((response) => {
        for (let user of response["users"]) {
          this.users.push({firstName: user.firstName, lastName: user.lastName, email: user.email});
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}