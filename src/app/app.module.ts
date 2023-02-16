import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import OktaAuth from '@okta/okta-auth-js';
import { OktaAuthModule } from '@okta/okta-angular';
import { OKTA_CONFIG } from '@okta/okta-angular';
import { ProfileComponent } from './components/profile/profile.component';

const config = {
  issuer: 'https://dev-64581829.okta.com/oauth2/default',
  clientId: '0oa8cfkn13OUIHcMz5d7',
  redirectUri: 'http://localhost:4200/login/callback',
  scopes: ['openid', 'profile', 'email'],
}

const oktaAuth = new OktaAuth(config);

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OktaAuthModule
  ],
  providers: [
    {
      provide: OKTA_CONFIG,
      useValue: {oktaAuth}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
