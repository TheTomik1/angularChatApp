import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'chat-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const users = [];

    this.http.get('https://dummyjson.com/users').subscribe((response: any) => {
      const users = response.users;
      for (const user of users) {
        users.push(user);
      
      }

    }, (error) => {
      console.log(error);
    });
  }
}
