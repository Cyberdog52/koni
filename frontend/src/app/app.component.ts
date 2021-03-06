import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public constructor(private titleService: Title ) { }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit(): void {
    this.setTitle('Koni');
  }

  public static getSocketUrl(): string {
    if (environment.production) {
      return 'http://andreskonrad.herokuapp.com/socket';
    } else {
      return 'http://localhost:8080/socket';
    }
  }
}
