import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  constructor(private http: HttpClient, private authService: AuthService) {
    this.getUsersData();
  }

  users: any = [];
  userDetails: Array<Object> = [];
  currentUser = this.authService.loggedInUser;

  getUsersData(): void {
    this.http.get<any[]>('https://dummyjson.com/users').subscribe((response) => {
        for (let user of response["users"]) {
          if (user.firstName+user.lastName != this.authService.loggedInUser) {
            this.users.push({firstName: user.firstName, 
              lastName: user.lastName, 
              username: user.username,
              birthDate: user.birthDate,
              image: user.image,
              eyeColor: user.eyeColor,
              university: user.university,
              macAddress: user.macAddress,
              ip: user.ip,
              city: user.address.city,
              email: user.email, 
              interaction: true});
          }
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  interact(user: any): void {
    user.interaction = !user.interaction;
  }

  showUserDetails(user: any): void {
    this.userDetails = user;
  }
}