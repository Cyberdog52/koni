import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../profile.service";
import {Profile} from "../model/dtos";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  loggedInProfile: Profile;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.loggedInProfile = JSON.parse(sessionStorage.getItem('profile'));
    this.profileService.loggedInProfile.subscribe(loggedInProfile => {
      this.loggedInProfile = loggedInProfile
    });

  }

  isLoggedIn(): boolean {
    return !!this.loggedInProfile;
  }
}
