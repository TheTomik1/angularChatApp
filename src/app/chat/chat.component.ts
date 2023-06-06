import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth.service';

import { LoginComponent } from '../login/login.component.js';
 
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
  currentUser = this.authService.loggedInUser;
  userDetails: Array<Object> = [];
  userChatting: Array<Object> = [];
  userLoginTime: LoginComponent["loginTime"];
  userGender = "";
  userCountry = "";
  clickCount = 0; 

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
              postalCode: user.address.postalCode,
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

  getUserGender(name: string): void {
    const apiUrl = `https://api.genderize.io/?name=${name}`;

    this.http.get(apiUrl).subscribe(response => {
      this.userGender = response["gender"];
    }, error => {
      this.userGender = "Could not determinate gender.";
      console.error('Error fetching user gender:', error);
    });
  }

  getUserCountry(postalCode: string): void {
    const apiUrl = `https://api.zippopotam.us/us/${postalCode}`;

    this.http.get(apiUrl).subscribe(response => {
      this.userCountry = response["country"];
    }, error => {
      this.userCountry = "Could not determinate country.";
      console.error('Error fetching user country:', error);
    });
  }

  interact(user: any): void {
    user.interaction = !user.interaction;
  }

  showUserDetails(user: any): void {
    this.userDetails = user;
    this.getUserGender(user.firstName);
    this.getUserCountry(user.postalCode);
  }

  closeUserDetails(): void {
    this.userDetails = [];
  }

  openChat(user: any): void {
    this.userChatting = user;
  }

  closeChat(): void {
    this.userChatting = [];
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    this.countClicks();
  }

  countClicks(): void {
    this.clickCount++;
  }

  logOut(): void {
    this.authService.logOut();
    this.clickCount = 0;
  }
}