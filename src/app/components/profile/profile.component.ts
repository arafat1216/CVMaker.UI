import { Component, Inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userName: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {}
  async ngOnInit() {
    let userclaims = await this.oktaAuth.getUser();
    this.userName  = userclaims.name
  }
}
