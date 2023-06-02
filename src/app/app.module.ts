import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';

import { LoggedInGuard } from './logged.guard.service';
import { AuthService } from './auth.service';

@NgModule({
  imports: [BrowserModule, CommonModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [AppComponent, LoggedInGuard, AuthService],
  declarations: [AppComponent, LoginComponent, ChatComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
