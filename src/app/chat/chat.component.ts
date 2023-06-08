import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth.service';

import { LoginComponent } from '../login/login.component';
 
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  constructor(private http: HttpClient, private authService: AuthService, private loginCompoent: LoginComponent) {
    this.getUsersData();
    this.userLoginTime = this.loginCompoent.loginTime;
  }

  users: any = [];
  currentUser = this.authService.loggedInUser;
  userDetails: Array<Object> = [];
  userChattingDetails: Array<Object> = [];
  userChattingMessages: Array<string> = [];
  userChattingResponse: Array<object> = [];
  userChattingMessage = "";
  userChattingCharactersTyped = "";
  userChattingChatsOpened = 0;
  userChattingHistory: any = [];
  userLoginTime: Date;
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

  getUserResponse(getLoggedInUserResponse: string) {
    const url = 'https://httpbin.org/post';
    const data = { text: getLoggedInUserResponse };

    this.http.post(url, data).subscribe(response => {
      let finalResponse = "";
      let getLastNumber = response["origin"].charAt(response["origin"].length - 1);
      for (let _ of response["json"]["text"]) {
        finalResponse += "A";
      };

      for (let i = 0; i < getLastNumber; i++) {
        finalResponse += "A";
      }

      this.userChattingResponse[getLoggedInUserResponse] = finalResponse;
    }, error => {
      this.userChattingResponse[getLoggedInUserResponse] = "Failed to get response.";
      console.error('Error fetching user response:', error);
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
    this.userChattingMessages = [];
    this.userChattingDetails = user;
    this.userChattingChatsOpened++;
  }

  sendMessage(): void {
    this.userChattingMessages.push(this.userChattingMessage);
    this.userChattingCharactersTyped += this.userChattingMessage;
    this.getUserResponse(this.userChattingMessage);
    this.userChattingHistory.push({
      activeUser: this.currentUser,
      activeUserMessage: this.userChattingMessage,
      messageSentAt: new Date(),
      respondUser: this.userChattingDetails['firstName'] + ' ' + this.userChattingDetails['lastName'],
      respondUserMessage: this.userChattingResponse[this.userChattingMessage],
      responseSentAt: new Date(),
    })
    console.log(this.userChattingHistory)

    this.userChattingMessage = "";
  }

  closeChat(): void {
    this.userChattingMessages = [];
    this.userChattingDetails = [];
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    this.countClicks();
  }

  countClicks(): void {
    this.clickCount++;
  }

  logOut(): void {
    alert(`Amount of characters sent during this login: ${this.userChattingCharactersTyped.length}\nLogin time: HH:MM:SS !!!!!!!`);
    this.authService.logOut();
    this.clickCount = 0;
    this.userChattingCharactersTyped = "";
    this.userChattingChatsOpened = 0;
  }
}