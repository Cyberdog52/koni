import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../shared/profile.service";
import {Identity, Profile} from "../shared/model/dtos";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name: string = "";
  password_plain: string = "";
  profileExists: boolean = false;

  constructor(private profileService: ProfileService,
              private router: Router,
              private toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  checkIfProfileExists() {
    if (this.isNameNotAllowed()) {
      this.toastrService.info('Sonderzeichen sind nicht erlaubt.', 'Achtung');
      return false;
    }
    this.profileService.getProfile(this.name).subscribe(profile => {
      this.profileExists = true;
    }, error => {
      this.profileExists = false;
      console.log(error)
    })
  }

  login() {
    const profile = this.createProfile();
    this.profileService.login(profile).subscribe(status => {
      this.loginLogic(profile)
    }, error=> {
      this.displayLogin(error);
      this.password_plain = "";
      console.log(error)
    });
  }

  loginLogic(profile: Profile) {
    this.profileService.setLocalProfile(profile);
    this.profileService.updateLoggedInProfile(profile);
    this.router.navigateByUrl('lobby')
  }

  create() {
    const profile = this.createProfile();
    this.profileService.createProfile(profile).subscribe(status => {
      this.loginLogic(profile)
    }, error=> {
      this.displayCreate(error);
      console.log(error)
    });
  }

  private createProfile(): Profile {
    return {
      identity: <Identity> {
        name: this.name
      },
      password_plain: this.password_plain,
    }
  }

  private displayLogin(error) {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 400:
        case 404: {
          this.toastrService.error('Name oder Passwort ist nicht korrekt.', 'Login Fehler');
          break
        }
        case 504: {
          this.toastrService.error('Probleme in der Applikation. Versuchen Sie es später erneut.', 'Login failure');
          break
        }
        default: {
          this.toastrService.error('Unbekanntes Problem.', 'Login Fehler');
        }
      }
    }
  }

  private displayCreate(error) {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 304: {
          this.toastrService.error('A profile with this username already exists. No profile was created.', 'Sign up failure');
          break
        }
        case 504: {
          this.toastrService.error('Connection problem with backend.', 'Sign up failure');
          break
        }
        default: {
          this.toastrService.error('Unknown problem.', 'Sign up failure');
        }
      }
    }
  }

  isNameNotAllowed() {
    if (this.name == null || this.name.length == 0) {
      return false;
    }
    console.log("name: ", this.name);
    const pattern = /^[a-zA-Z0-9]*$/;
    return !this.name.match(pattern);
  }


  createProfileDisabled() {
    return this.profileExists ||
      this.name.length == 0 ||
      this.isNameNotAllowed() ||
      this.password_plain.length == 0;
  }
}

