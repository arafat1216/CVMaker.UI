import { OktaAuth } from '@okta/okta-auth-js';
import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isAuthenticated: boolean = false;
  userName: any

  constructor(
    @Inject(OKTA_AUTH) public oktaAuth: OktaAuth, 
    public authStateService: OktaAuthStateService,
    private router:Router
  ) {}
  async ngOnInit() {
    let userClaims = await this.oktaAuth.getUser();

    this.userName= userClaims.name
  }

  async Login() {
    await this.oktaAuth.signInWithRedirect();
    this.router.navigate(['/dashboard'])
  }

  async Logout() {
    await this.oktaAuth.signOut();
  }
}
