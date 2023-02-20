import { Router } from '@angular/router';
import { ProfileService } from './../../services/profile.service';
import { Component, Inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { Profile } from 'src/app/models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userName: any;
  profile:Profile = {
    fullName:'',
    email:'',
    phoneNo:'',
    address:''
  }
  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private profileService: ProfileService, private router:Router) {}
  
  async ngOnInit() {
    let userclaims = await this.oktaAuth.getUser();
    this.userName  = userclaims.name;
    let token = await this.oktaAuth.getAccessToken();
    this.getProfile();
  }

  private getProfile(){
    this.profileService.getProfile()
    .subscribe({
      next:(result) =>{
        this.profile = result
      }
    })
  }

  onSubmit(){
    this.profileService.updateProfile(this.profile)
    .subscribe({
      next:(result) =>{
        this.router.navigate(['/dashboard']);
      }
    })
  }
}
