import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { LoginComponentComponent } from './login-component/login-component.component';

@NgModule({
  imports: [AppRoutingModule],
  declarations: [LoginComponentComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}