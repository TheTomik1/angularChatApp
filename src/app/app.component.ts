import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'chat-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authService: AuthService) {
  }

  getLoginStatus(): boolean {
    return this.authService.logggedInStatus;
  }
}
