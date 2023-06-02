import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [AppComponent],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
