import { Component, OnInit, Inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { SocialLinks } from 'src/app/models/social-links.model';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.css']
})
export class SocialLinksComponent implements OnInit {
  userName: any = '';

  socialLinks: SocialLinks = {
    linkedinUrl: '',
    githubUrl: ''
  };

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth){}

  async ngOnInit(){
    let userclaims = await this.oktaAuth.getUser();
    this.userName  = userclaims.name;
  }
  
  onSubmit(){
    console.log(this.socialLinks)
  }
}
