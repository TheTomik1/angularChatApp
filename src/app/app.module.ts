import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  imports: [BrowserModule, AppRoutingModule],
  providers: [AppComponent],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
